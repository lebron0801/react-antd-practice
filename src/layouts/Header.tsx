import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Modal, Tooltip, message } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import RouterConfig from '@/routers/RouterConfig';
import config from '@/config/default.config';
import classnames from 'classnames';
import IconFont from '@/assets/iconfont/IconFont';
import { refreshByCacheKey } from 'react-router-cache-route';
import store from '@/store';
import { local } from '@/utils/storage';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { Unsubscribe } from 'redux';

interface RouteComponentPropsExtra extends RouteComponentProps {
  /**
   * 是否折叠
   */
  collapsed: boolean;
}

const logo = require('@assets/images/logo.svg').default;
const avatar = require('@assets/images/avatar.png').default;
const username = local.get('LOGININFO')?.account.username;

class Header extends React.Component<RouteComponentPropsExtra> {
  state = {
    selectedLang: ['chinese'],
    account: store.getState().user.account
  };

  unsubscribe!: Unsubscribe;

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        account: store.getState().user.account
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // 刷新路由页面
  refreshRouter = () => {
    refreshByCacheKey(store.getState().app.curCacheRoute);
    message.success('刷新成功');
  };

  render() {
    const menu = (
      <Menu
        selectedKeys={this.state.selectedLang}
        style={{ minWidth: 160 }}
        onClick={(data) => {
          this.setState(
            {
              selectedLang: [data.key]
            },
            () => {
              message.success('切换成功');
            }
          );
        }}
      >
        <Menu.Item key="english">
          <span>English</span>
        </Menu.Item>
        <Menu.Item key="chinese">
          <span>简体中文</span>
        </Menu.Item>
      </Menu>
    );

    const userInfo = (
      <Menu
        onClick={(data) => {
          data.key === 'loginout' &&
            Modal.confirm({
              cancelText: '取消',
              centered: true,
              closable: true,
              content: <div>确定退出？</div>,
              okText: '确认',
              onCancel: () => {},
              onOk: () => {
                local.clear(); // 清除所有localStorage
                this.props.history.push('/user/login');
              }
            });
        }}
        style={{ minWidth: 160 }}
      >
        <Menu.Item icon={<UserOutlined />} key="usercenter">
          <span>个人中心</span>
        </Menu.Item>
        <Menu.Item icon={<SettingOutlined />} key="userset">
          <span>个人设置</span>
        </Menu.Item>
        <Menu.Divider></Menu.Divider>
        <Menu.Item icon={<LogoutOutlined />} key="loginout">
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout.Header className="framework-header">
        <div className={classnames('framework-header-layout', { light: config.theme.topbarTheme === 'light' })}>
          {config.theme.navMode === 'top' && (
            <div className="framework-header-layout-left">
              <div className="framework-header-layout-left-logo">
                <a>
                  <img src={logo} alt="logo" />
                  <h1>Admin Pro</h1>
                </a>
              </div>
            </div>
          )}

          {/* 顶部菜单导航 */}
          <div className="framework-header-layout-menu" style={{ flex: '1 1 0%' }}>
            {config.theme.navMode === 'top' && (
              <Menu
                mode="horizontal"
                theme={config.theme.topbarTheme}
                defaultSelectedKeys={[config.homePage]}
                onClick={(data: any) => {
                  this.props.history.push(data.key);
                }}
              >
                {RouterConfig.childrens.map((item) => {
                  return item.nodeType === 'page' ? (
                    <Menu.Item key={item.path}>{item.meta.title}</Menu.Item>
                  ) : (
                    <Menu.SubMenu
                      key={item.code}
                      title={item.meta.title}
                      icon={item.meta.icon !== '' && <IconFont type={item.meta.icon} />}
                    >
                      {item.childrens &&
                        item.childrens.length > 0 &&
                        item.childrens.map((sub) => {
                          return sub.nodeType === 'page' ? (
                            <Menu.Item key={sub.path}>{sub.meta.title}</Menu.Item>
                          ) : (
                            <Menu.SubMenu
                              key={sub.code}
                              title={sub.meta.title}
                              icon={sub.meta.icon !== '' && <IconFont type={sub.meta.icon} />}
                            >
                              {sub.childrens &&
                                sub.childrens.length > 0 &&
                                sub.childrens.map((son) => {
                                  return <Menu.Item key={son.path}>{son.meta.title}</Menu.Item>;
                                })}
                            </Menu.SubMenu>
                          );
                        })}
                    </Menu.SubMenu>
                  );
                })}
              </Menu>
            )}
          </div>

          {/* 右侧操作栏 */}
          <div
            className={classnames('framework-header-layout-right', {
              light: config.theme.topbarTheme === 'light'
            })}
          >
            <Tooltip title="刷新">
              <span className="header-btn-action" onClick={this.refreshRouter}>
                <ReloadOutlined />
              </span>
            </Tooltip>
            <Tooltip title="检索信息">
              <SearchOutlined className="header-btn-action" />
            </Tooltip>
            <Tooltip title="使用文档">
              <QuestionCircleOutlined className="header-btn-action" />
            </Tooltip>
            <Tooltip title="通知">
              <BellOutlined className="header-btn-action" />
            </Tooltip>
            <Dropdown overlay={userInfo} placement="bottomRight">
              <span className="header-btn-action">
                <Avatar size="small" src={avatar} />
                <span style={{ fontSize: 14, marginLeft: 5 }}>{username}</span>
              </span>
            </Dropdown>
            <Dropdown overlay={menu} placement="bottomRight">
              <IconFont type="saas-language" className="header-btn-action" />
            </Dropdown>
            <Tooltip title="设置">
              <MoreOutlined className="header-btn-action" />
            </Tooltip>
          </div>
        </div>
      </Layout.Header>
    );
  }
}

export default withRouter(Header);
