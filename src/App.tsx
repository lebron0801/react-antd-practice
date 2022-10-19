import React from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { baseRouterMap, asyncRouterMap } from '@/routers/RouterMaps';
import '@assets/less/App.less';
import { ConfigProvider } from 'antd';

const App: React.FC = () => {
  const routers = [...baseRouterMap, ...asyncRouterMap];
  return (
    <ConfigProvider prefixCls="coho">
      <div className="App">
        <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/ees-page' : process.env.PUBLIC_URL}>
          <Switch>
            {routers.map((item) => {
              return (
                <Route
                  key={item.code}
                  path={item.path}
                  render={(props: RouteComponentProps) => <item.component {...{ ...props, meta: item.meta }} />}
                ></Route>
              );
            })}
          </Switch>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
};

export default App;
