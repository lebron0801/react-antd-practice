import { ComponentClass, FC } from 'react';
import loadable from '@loadable/component';

type RouterObjInfo = {
  /**
   * 路由组件相对路径
   */
  path: string;
  /**
   * 路由组件文件名称
   */
  name: string;
  /**
   * 路由组件对象
   */
  component: ComponentClass<any> | FC<any>;
};

const list: Array<RouterObjInfo> = [];
const files = require.context('@/pages/business', true, /\.tsx$/);

files.keys().forEach((item) => {
  const fileName = item.split('/').reverse()[0].split('.')[0];

  list.push({
    path: item.substring(1).split('.')[0],
    name: fileName,
    component: loadable(() => import(`@/pages/business${item.substring(1)}`))
  });
});

export default list;
