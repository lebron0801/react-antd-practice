import React from 'react';
import { Spin, Button } from 'antd';
import loadable from '@loadable/component';
import { RouteComponentProps } from 'react-router-dom';
import { CacheRouteProps } from 'react-router-cache-route';
import '@/assets/less/business/Analysis.less';

const LoadableComponent = loadable(() => import('@/components/function/Layout'), {
  fallback: <Spin />
});

type PropsType = RouteComponentProps & CacheRouteProps;

class Analysis extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);

    if (props.meta.keepAlive) {
      props.cacheLifecycles?.didCache(this.componentDidCache);
      props.cacheLifecycles?.didRecover(this.componentDidRecover);
    }
  }

  componentDidCache = () => {
    console.log('List cached');
  };

  componentDidRecover = () => {
    console.log('List recovered');
  };

  render() {
    return (
      <div className="analysis-wrapper">
        <LoadableComponent />
        <Button
          onClick={() => {
            this.props.history.push({ pathname: '/UserCenter/UserList' });
          }}
        >
          跳转
        </Button>
      </div>
    );
  }
}

export default Analysis;
