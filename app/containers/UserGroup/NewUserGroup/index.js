/**
 * @author liuyanhao
 * @date 2018-01-30
 * @Description:
 */
import React,{Component,PureComponent} from 'react'
import { Select, Spin,Form, Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import SelectRemoteUser from './SelectRemoteUser'
import {doNewUserGroup} from "actions/userGroup";
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
  };
  handleSubmit = (e) => {
    const {dispatch} = this.props
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch(doNewUserGroup(values))
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

  render() {
    const {onReturn,dispatch} = this.props
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult,submitLoading } = this.state;

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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    return (
      <section className='ant-layout-content api-container'>
        <Form onSubmit={this.handleSubmit}>
          {/*<FormItem
            {...formItemLayout}
            label="key"
          >
            {getFieldDecorator('key', {
              rules: [{
                message: '请输入Key',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </FormItem>*/}
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('name', {
              rules: [{
                message: '请输入用户名称',
              }, {
                required: true, message: 'Please input your E-mail!',
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
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="选择users"
          >
            {getFieldDecorator('users', {
              rules: [{
                required: true, message: 'Please input your password!',
              }]
            })(
              <SelectRemoteUser/>
            )}
          </FormItem>
          <Row>
            <Col offset={4} span={20}>
              <Button type="primary" loading={submitLoading} onClick={this.enterLoading}>
                Click me!
              </Button>
              <Button style={{marginLeft:'10px'}} onClick={onReturn}>返回上一层</Button>
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
