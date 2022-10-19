import React from 'react';
import { Layout } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Header from './Header';
import Content from './Content';
import Sider from './Sider';
import config from '@/config/default.config';
import '@assets/less/framework/FrameworkBase.less';

class FrameworkBase extends React.Component<RouteComponentProps> {
  state = {
    collapsed: false
  };

  collapsedHandle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <div className="framework-base-wrapper">
        {window.__POWERED_BY_QIANKUN__ ? (
          <Content />
        ) : (
          <Layout style={{ height: '100vh', minHeight: '100vh' }}>
            {config.theme.navMode === 'side' && (
              <>
                <div className={classnames('framework-sider-placeholder', { collapsed })}></div>
                <Sider collapsed={collapsed} onCollapsed={this.collapsedHandle} />
              </>
            )}
            <Layout>
              <Header collapsed={collapsed} />
              <Content />
            </Layout>
          </Layout>
        )}
      </div>
    );
  }
}

export default withRouter(FrameworkBase);
