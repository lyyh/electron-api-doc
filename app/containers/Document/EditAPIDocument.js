/**
 * @author liuyanhao
 * @date 2018-03-12
 * @Description:
 */
import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Menu, Icon, Button,Row, Col,Breadcrumb,Table,Form,Input,Select } from 'antd';
import {addApis} from "actions/apiDoc";
import {LOADING_STATUS} from "mixins/statusMixins";

const FormItem = Form.Item

class EditAPIDocumentContainer extends Component{
  state={
    formItemKeys:[0],
    requestFormItemKeys:[0],
    responseFormItemKeys:[0]
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {dispatch,data} = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(values)
        const infos = values.method.map((mValue,mIndex)=>{
          const params = values.parameters[mIndex].map((pValue,pIndex)=>{
            return {
              key: pValue,
              name: pValue,
              isRequire: true,
              fieldType: 'string',
              description: values.paramDescriptions[mIndex][pIndex]
            }
          })
          return {
            method: mValue,
            params: params
          }
        })

        const api = {
          key: values.name,
          details:[{
            url: values.url,
            infos: infos
          }]
        }
        // const reqParams = values.parameters.map((value,index)=>{
        //   return {
        //     name: value,
        //     key: value,
        //     isRequire: true,
        //     fieldType: 'string',
        //     description: values.paramDescriptions[index]
        //   }
        // })
        // const infos = values.method.map((value,index)=>{
        //   return {
        //     method: value,
        //     params: reqParams
        //   }
        // })

        // values={
        //   key:values.name,
        //   details:[{
        //     url: values.url,
        //     infos:infos
        //   }]
        // }

        dispatch(addApis(api,data.key))
      }
    });
  }

  addUrlItems = () => {
    const {urlFormItemKeys} = this.state
    const {form} = this.props
    const nextKeys = [...urlFormItemKeys,urlFormItemKeys.length]
    form.setFieldsValue({
      urlFormItemKeys: nextKeys
    })

    this.setState({
      urlFormItemKeys: nextKeys
    })
  }

  addItems = () => {
    const {formItemKeys} = this.state
    const {form} = this.props
    const nextKeys = [...formItemKeys,formItemKeys.length]
    form.setFieldsValue({
      formItemKeys: nextKeys
    })

    this.setState({
      formItemKeys: nextKeys
    })
  }

  addRequestParams = () => {
    const {form} = this.props
    const {requestFormItemKeys} = this.state
    const nextKeys = [...requestFormItemKeys,requestFormItemKeys.length]
    form.setFieldsValue({
      requestParamsKeys: nextKeys
    })

    this.setState({
      requestFormItemKeys:nextKeys
    })
  }

  addResponseParams = () => {
    const {responseFormItemKeys} = this.state
    const nextKeys = [...responseFormItemKeys,responseFormItemKeys.length]
    this.setState({
      responseFormItemKeys:nextKeys
    })
  }

  render() {
    const {data,form} = this.props
    const {getFieldDecorator} = form
    const {formItemKeys,requestFormItemKeys} = this.state

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    const requestFormItems = (itemKey) => {
      return requestFormItemKeys.map((value,index)=>{
        return(
          <Row key={value}>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="请求参数"
              >
                {getFieldDecorator(`parameters[${itemKey}][${value}]`)(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="参数描述"
              >
                {getFieldDecorator(`paramDescriptions[${itemKey}][${value}]`)(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <Button onClick={this.addRequestParams}>
                <Icon type="plus" />增加请求参数栏
              </Button>
            </Col>
          </Row>
        )
      })
    }

    const formItems = formItemKeys.map((value,index)=>{
      return (
        <div key={value}>
          <FormItem
            {...formItemLayout}
            label="请求方法"
          >
            {getFieldDecorator(`method[${value}]`, {
              rules: [{
                required: true, message: 'Please input your password!',
              }],
              initialValue: '0'
            })(
              <Select style={{ width: 120 }}>
                <Option value="0">get</Option>
                <Option value="1">post</Option>
                <Option value="2">put</Option>
                <Option value="3">delete</Option>
              </Select>
            )}
          </FormItem>
          {requestFormItems(value)}
        </div>
      )
    })

    return (
      <div class="apidoc-scroll-wrapper">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="接口名称"
          >
            {getFieldDecorator(`name`)(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="接口URL"
          >
            {getFieldDecorator(`url`)(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="接口地址描述"
          >
            {getFieldDecorator('urlDescription')(
              <Input/>
            )}
          </FormItem>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.addItems} style={{ width: '60%' }}>
              <Icon type="plus" /> 新增请求方法
            </Button>
          </FormItem>
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.addUrlItems} style={{ width: '60%' }}>
              <Icon type="plus" /> 新增接口
            </Button>
          </FormItem>
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">创建并编辑详情</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default connect((state) => {
  const currentApiDoc = state['apiDoc']
  return currentApiDoc && currentApiDoc['state']?{
    state: currentApiDoc['state'],
    data: currentApiDoc['data'],
    error: currentApiDoc['error']
  }:{
    data: null,
    state: LOADING_STATUS,
    error: null
  }
})(Form.create()(EditAPIDocumentContainer))
