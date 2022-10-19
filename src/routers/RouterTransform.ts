const datas: Array<RouteObject> = [];

const recursion = (data: Array<RouteObject>) => {
  data.forEach((item) => {
    if (item.nodeType === 'page') {
      datas.push(item);
    }

    if (item.childrens && item.childrens.length > 0) {
      recursion(item.childrens);
    }
  });
};

/**
 * 路由数据转换函数
 * @param data 路由树形对象
 * @returns 路由数据 一维数组
 */
const routerTransform = (data: Record<string, any>): Array<RouteObject> => {
  if (datas.length > 0) return datas;
  recursion(data.childrens);
  return datas;
};

export default routerTransform;
