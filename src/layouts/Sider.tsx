import React from 'react';
import { Layout, Menu } from 'antd';
import classnames from 'classnames';
import RouterConfig from '@/routers/RouterConfig';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import config from '@/config/default.config';
import IconFont from '@/assets/iconfont/IconFont';
import Scrollbars from '@/components/container/Scrollbars';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

interface RouteComponentPropsExtra extends RouteComponentProps {
  /**
   * 是否折叠
   */
  collapsed: boolean;
  /**
   * 折叠切换回调函数
   */
  onCollapsed: () => void;
}

class Sider extends React.Component<RouteComponentPropsExtra> {
  state = {
    logo: require('@assets/images/logo.svg').default
  };

  render() {
    const { collapsed, onCollapsed } = this.props;
    return (
      <Layout.Sider
        breakpoint="lg"
        className="framework-sider framework-sider-fixed"
        trigger={null}
        collapsible
        collapsedWidth={48}
        collapsed={collapsed}
        onCollapse={(collapsed, type) => {
          type === 'responsive' && onCollapsed();
        }}
      >
        <div className={classnames('framework-sider-logo', { collapsed })}>
          <a>
            <img src={this.state.logo} alt="logo" />
            {!collapsed ? <h1>Admin Pro</h1> : null}
          </a>
        </div>
        <div className="framework-sider-menu">
          <Scrollbars className="undefined" thumbVerticalLight={false} trackVerticalLight={false}>
            <Menu
              mode="inline"
              theme="dark"
              defaultOpenKeys={(() => {
                const arr = config.homePage.split('/');
                return arr.slice(1, arr.length - 1);
              })()}
              defaultSelectedKeys={[config.homePage]}
              inlineIndent={16}
              onClick={(data: any) => {
                this.props.history.push(data.key);
              }}
              style={{ borderRight: 0, width: '100%' }}
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
          </Scrollbars>
        </div>
        <div className="framework-sider-links">
          <Menu
            mode="inline"
            theme="dark"
            inlineIndent={16}
            selectable={false}
            onClick={() => {
              onCollapsed();
            }}
            style={{ borderRight: 0, width: '100%' }}
          >
            <Menu.Item
              key="link"
              className="collapsed-item-active"
              icon={React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'collapsed-button'
              })}
            ></Menu.Item>
          </Menu>
        </div>
      </Layout.Sider>
    );
  }
}

export default withRouter(Sider);
