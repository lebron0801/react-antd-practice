import React from 'react';
import { Layout } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import FrontendAuth from '@/routers/FrontendAuth';
import { CacheSwitch } from 'react-router-cache-route';

class Content extends React.Component<RouteComponentProps> {
  render() {
    return (
      <Layout.Content className="framework-content">
        <div className="framework-content-layout">
          <CacheSwitch>
            <FrontendAuth />
          </CacheSwitch>
        </div>
      </Layout.Content>
    );
  }
}

export default withRouter(Content);
