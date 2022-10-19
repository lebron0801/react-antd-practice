import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getTokenInfo, getUserInfo } from '@/apis/auth';
import config from '@/config/default.config';
import '@assets/less/user/Login.less';
import { setToken } from '@/utils/jsonWebToken';
import { RouteComponentProps } from 'react-router-dom';
import { local } from '@/utils/storage';

type StateType = {
  /**
   * 异步加载的logo module
   */
  logo: any;
  /**
   * 按钮状态
   */
  loading: boolean;
  /**
   * 提交文字
   */
  text: string;
};

const layout = {
  wrapperCol: { span: 24 }
};

const tailLayout = {
  wrapperCol: { span: 24 }
};

class Login extends React.Component<RouteComponentProps, StateType> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      logo: require('@assets/images/logo.svg').default,
      loading: false,
      text: '提交'
    };
  }

  render() {
    const onFinish = async (values: any) => {
      this.setState((state) => ({ loading: !state.loading, text: '提交中...' }));

      try {
        const tokenInfo: any = await getTokenInfo({
          ...values,
          grant_type: 'password',
          client_id: 'gGywGzvMLSjsdFjGEpIs',
          client_secret: 'bxsjweclZss2dd8ohnfFJrZm8ZLCiavkna7UbB1o',
          scope: 'ess'
        });

        const userInfo = await getUserInfo(tokenInfo);

        setToken(tokenInfo, userInfo);

        local.set('LOGININFO', { account: values });

        this.props.history.push({ pathname: config.homePage, search: '?id=1', state: { age: 123, haha: '哈哈哈' } });
      } catch (error) {
        this.setState((state) => ({ loading: !state.loading, text: '提交' }));
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div className="login-wrapper">
        <div className="login-wrapper-content">
          <div className="login-wrapper-content-top">
            <div className="login-wrapper-content-top-header">
              <a href="/">
                <img alt="logo" className="login-wrapper-content-top-header-logo" src={this.state.logo} />
                <span className="login-wrapper-content-top-header-title">Ant Design</span>
              </a>
            </div>
            <div className="login-wrapper-content-top-desc">
              <span>Ant Design 是西湖区最具影响力的 Web 设计规范</span>
            </div>
          </div>
          <div className="login-wrapper-content-form">
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true, username: 'lebron', password: 'lebron' }}
              onFinish={onFinish}
              size="large"
              onFinishFailed={onFinishFailed}
            >
              <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
                <Input
                  prefix={<UserOutlined style={{ color: '#1890ff' }} className="site-form-item-icon" />}
                  placeholder="用户名"
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#1890ff' }} className="site-form-item-icon" />}
                  placeholder="密码"
                />
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>自动登录</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={this.state.loading} block size="large">
                  {this.state.text}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
