import loadable from '@loadable/component';

/**
 * 业务路由
 */
export const asyncRouterMap: RouteObject[] = [
  {
    path: '/',
    name: '主框架',
    code: 'framework',
    component: loadable(() => import('@/pages/framework/Index')),
    nodeType: 'page',
    meta: { title: '主框架', auth: false, icon: '', keepAlive: true },
    children: []
  }
];

/**
 * 基础路由
 */
export const baseRouterMap: RouteObject[] = [
  {
    path: '/user/login',
    name: '登录',
    code: 'login',
    nodeType: 'page',
    component: loadable(() => import('@pages/user/Login')),
    meta: { title: '登录', auth: false, icon: '', keepAlive: true }
  }
];
