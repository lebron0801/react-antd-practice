import React from 'react';
import { Route, Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import loadable from '@loadable/component';
import config from '@/config/default.config';
import AutoImport from '@/routers/AutoImport';
import CacheRoute, { CacheRouteProps } from 'react-router-cache-route';
import { local } from '@/utils/storage';
import store from '@/store';
import { setCurCacheRoute } from '@/store/actions';
import RouterTransform from '@/routers/RouterTransform';
import RouterConfig from '@/routers/RouterConfig';

// 树形菜单路由被拉平后的数据，正式环境下需来自服务端
const routers: RouteObject[] = RouterTransform(RouterConfig);

type StateType = {
  current: RouteObject | null;
};

const NotFound = loadable(() => import('@/pages/exceptions/404'));

class FrontendAuth extends React.Component<RouteComponentProps, StateType> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      current: null
    };
  }

  static getDerivedStateFromProps(props: RouteComponentProps, state: StateType) {
    if (props.location.pathname !== state.current?.path) {
      return {
        current: routers.find((item) => item.path === props.location.pathname)
      };
    }

    return null;
  }

  componentDidUpdate() {
    this.relationSideEffect();
  }

  componentDidMount() {
    this.relationSideEffect();
  }

  relationSideEffect() {
    document.title = this.state.current?.meta.title || '';
    // 设置当前缓存路由key方便后期刷新
    store.dispatch(setCurCacheRoute({ curCacheRoute: this.state.current?.path }));
  }

  render() {
    const { current } = this.state;
    const { pathname } = this.props.location;
    const isLogin = local.get('access_token');

    if (isLogin) {
      if (pathname === '/user/login') {
        return <Redirect to={config.homePage} />;
      }
    } else {
      if (current && current.meta.auth) {
        return <Redirect to="/user/login" />;
      }
    }

    if (pathname === '/') {
      return <Redirect to={config.homePage} />;
    }

    if (!current) {
      return <Route component={NotFound} />;
    }

    return (
      <>
        {routers.map((item) => {
          const currentRouter = AutoImport.find((sub) => sub.name === item.code);

          if (currentRouter) {
            if (config.multiTab || item.meta.keepAlive) {
              return (
                <CacheRoute
                  when="always"
                  cacheKey={item.path}
                  key={item.path}
                  className="cache-route"
                  exact
                  path={item.path}
                  saveScrollPosition
                  render={(props: CacheRouteProps) => <currentRouter.component {...{ ...props, meta: item.meta }} />}
                />
              );
            }

            return (
              <Route
                key={item.path}
                exact
                path={item.path}
                render={(props: RouteComponentProps) => <currentRouter.component {...{ ...props, meta: item.meta }} />}
              />
            );
          }

          return null;
        })}
      </>
    );
  }
}

export default withRouter(FrontendAuth);
