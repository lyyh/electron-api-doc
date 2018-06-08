/**
 * @author liuyanhao
 * @date 2018-01-30
 * @Description:
 */
import React,{Component,PureComponent} from 'react'
import { Select, Spin,Form, Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import SelectRemoteUser from './SelectRemoteUser'
import {createUserGroup} from "actions/userGroup";
import {SUCCESS_STATUS} from "../../../mixins/statusMixins";
import {FETCH_USERS_OVER_ACTION} from 'actions/user'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    submitLoading: false,
    autoCompleteResult: [],
    selectedValue: []
  };
  handleSubmit = (e) => {
    const {dispatch,user} = this.props
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.users.push({
          name: user.name,
          permission: '1'
        })
        values.creator = user.key
        dispatch(createUserGroup(values))
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  enterLoading = () => {
    this.setState({
      submitLoading: true
    })
  }

  handleSelectChange = (selectedValue) => {
    const {dispatch,form} = this.props
    const userNames = selectedValue.map((ele,index) => {
      return {
        name: ele.key,
        permission: '0' // temporary code
      }
    })

    // set field value by manual operation
    form.setFieldsValue({
      users: [...userNames]
    })

    dispatch({
      type: FETCH_USERS_OVER_ACTION,
      state: SUCCESS_STATUS
    })
  }

  render() {
    const { onReturn,dispatch,user} = this.props
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult,submitLoading,selectedValue } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <section className='ant-layout-content api-container'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('name', {
              rules: [{
                message: '请输入用户组名称',
              }, {
                required: true, message: '请输入用户组名称',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('description', {
              rules: [{
                message: '请输入描述',
              }, {
                required: true, message: '请输入描述',
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="选择users"
          >
            {getFieldDecorator('users')(
              <SelectRemoteUser
                user={user}
                handleSelectChange={this.handleSelectChange}
              />
            )}
          </FormItem>
          <Row>
            <Col offset={4} span={20}>
              <Button type="primary" htmlType="submit" loading={submitLoading}>
                确定
              </Button>
              <Button style={{marginLeft:'10px'}} onClick={onReturn}>返回登录</Button>
            </Col>
          </Row>
        </Form>
      </section>
    );
  }
}
// export default connect((state)=> {
//   const currentLogin = state['login'];
//   return currentLogin ? {
//     state: currentLogin['state'] || null,
//     data: currentLogin['data'] || null,
//     error: currentLogin['error'] || null
//   }:{
//     state: LOADING_STATUS
//   }
// })(Form.create()(RegistrationForm))

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm
