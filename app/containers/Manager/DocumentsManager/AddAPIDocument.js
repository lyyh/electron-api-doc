/**
 * @author liuyanhao
 * @date 2018-01-28
 * @Description:
 */
import React,{PureComponent} from 'react'
import { Form, Input, Icon, Button, Select } from 'antd';
import { connect } from 'react-redux'
import './index.less'
import {LOADING_STATUS} from "mixins/statusMixins";
import {createApiDoc} from "actions/apiDoc";
import apiDoc from "../../../reducers/apiDoc";
import EditAPIDocument from '../../Document/EditAPIDocument'

const FormItem = Form.Item;
const Option = Select.Option;

class DynamicFieldSet extends PureComponent {
  state = {
    formItemKeys:[0]
  }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const {formItemKeys} = this.state
    const nextKeys = [...formItemKeys,formItemKeys.length]
    this.setState({
      formItemKeys: nextKeys
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {dispatch,data,history,userGroupKey} = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        values={
          ...values,
          owner:{
            key: data.key,
            permission: data.permission
          },
          userGroupKey:userGroupKey
        }
        dispatch(createApiDoc(values,history))
      }
    });
  }

  render() {
    const {apiDocState,apiDocData,userGroupKey } = this.props
    const {formItemKeys} = this.state
    const { getFieldDecorator, getFieldValue} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
    };
    const formItemLayoutLg = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      }
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const formItems = formItemKeys.map((k, index) => {
      return (
        <div>
          <FormItem
            {...formItemLayoutLg}
            label='文档名称'
            required={true}
            key='apiName'
          >
            {getFieldDecorator(`name`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                // message: "Please input passenger's name or delete this field.",
              }],
              initialValue: ''
            })(
              <Input placeholder="文档名称" style={{ width: '60%', marginRight: 8 }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayoutLg}
            label='文档描述'
            required={true}
            key='apiDetail'
          >
            {getFieldDecorator(`description`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                // message: "Please input passenger's name or delete this field.",
              }],
              initialValue: ''
            })(
              <Input placeholder="文档描述" style={{ width: '60%', marginRight: 8 }} />
            )}
          </FormItem>
          {/*<FormItem*/}
          {/*{...formItemLayout}*/}
          {/*label='请求方法'*/}
          {/*required={true}*/}
          {/*key='apiMethod'*/}
        {/*>*/}
          {/*{getFieldDecorator(`apiMethod`, {*/}
            {/*validateTrigger: ['onChange', 'onBlur'],*/}
            {/*rules: [{*/}
              {/*whitespace: true,*/}
              {/*required: true,*/}
              {/*// message: "Please input passenger's name or delete this field.",*/}
            {/*}],*/}
            {/*initialValue: 'get'*/}
          {/*})(*/}
            {/*<Select style={{ width: 120 }}>*/}
              {/*<Option value="get" key='get'>get</Option>*/}
              {/*<Option value="post" key='post'>post</Option>*/}
              {/*<Option value="put" key='put'>put</Option>*/}
              {/*<Option value="delete" key='delete'>delete</Option>*/}
              {/*<Option value="option" key='option'>option</Option>*/}
            {/*</Select>*/}
          {/*)}*/}
        {/*</FormItem>*/}
        {/*<FormItem*/}
          {/*{...formItemLayoutLg}*/}
          {/*label='请求URL'*/}
          {/*required={true}*/}
          {/*key='apiURL'*/}
        {/*>*/}
          {/*{getFieldDecorator(`apiURL`, {*/}
            {/*validateTrigger: ['onChange', 'onBlur'],*/}
            {/*rules: [{*/}
              {/*whitespace: true,*/}
              {/*required: true,*/}
              {/*// message: "Please input passenger's name or delete this field.",*/}
            {/*}],*/}
            {/*initialValue: ''*/}
          {/*})(*/}
            {/*<Input placeholder="请求URL" style={{ width: '60%', marginRight: 8 }} />*/}
          {/*)}*/}
        {/*</FormItem>*/}
        </div>
      );
    });


    return apiDocState=='success'? <EditAPIDocument data={apiDocData} userGroupKey={userGroupKey}/>:(
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">创建并编辑详情</Button>
        </FormItem>
      </Form>
    );
  }
}

export default connect((state) => {
  const currentUser = state['user']
  const currentApiDoc = state['apiDoc']
  return currentUser && currentUser['state']?{
    state: currentUser['state'],
    data: currentUser['data'],
    apiDocState: currentApiDoc['state'],
    apiDocData: currentApiDoc['data'],
    error: currentUser['error']
  }:{
    data: null,
    state: LOADING_STATUS,
    apiDocState: null,
    apiDocData: null,
    error: null
  }
})(Form.create()(DynamicFieldSet))
