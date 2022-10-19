interface Window {
  /**
   * 当前socket对象
   */
  socket: any;
  /**
   * 是否以微服务启动
   */
  __POWERED_BY_QIANKUN__: any;
}

/**
 * ajax请求返回的数据模型
 */
declare interface CommonAjaxReturnDataModel {
  /**
   * 业务状态码
   */
  code: number;
  /**
   * 业务处理返回的消息
   */
  msg: string;
  /**
   * 业务返回的数据
   */
  data?: any;
  /**
   * 错误消息，只有在错误时返回
   */
  error?: string;
}

type MetaInfomation = {
  /**
   * 路由标题
   */
  title: string;
  /**
   * 页面Icon
   */
  icon: string;
  /**
   * 是否需要认证
   */
  auth: boolean;
  /**
   * 是否保持激活
   */
  keepAlive: boolean;
};

interface RouteObject {
  /**
   * 路由地址
   */
  path: string;
  /**
   * 路由名称
   */
  name: string;
  /**
   * 路由编码
   */
  code: string;
  /**
   * 节点类型
   */
  nodeType: string;
  /**
   * 路由组件
   */
  component?: ComponentClass<any> | FC<any>;
  /**
   * 路由元信息
   */
  meta: MetaInfomation;
  /**
   * 子路由
   */
  children?: Array<RouteObject>;
  /**
   * 其他字段
   */
  [key: string]: any;
}
