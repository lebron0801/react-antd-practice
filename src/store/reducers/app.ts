import { SET_LANG, SET_HOME, SET_CUR_CACHE_ROUTE } from '@/constants/store';

const initState = {
  lang: 'zh',
  home: '',
  curCacheRoute: ''
};

export type AppInitState = {
  /**
   * 多语言
   */
  lang: string;
  /**
   * 主页
   */
  home: string;
  /**
   * 当前缓存路由组件
   */
  curCacheRoute: string;
};

interface Action {
  /**
   * 动作类型
   */
  type: string;
  /**
   * 需要更新的数据
   */
  payload?: AppInitState;
}

const app = (state: AppInitState = initState, action: Action = { type: '' }) => {
  switch (action.type) {
    case SET_LANG:
      return (state = { ...state, lang: action.payload!.lang });
    case SET_HOME:
      return (state = { ...state, home: action.payload!.home });
    case SET_CUR_CACHE_ROUTE:
      return (state = { ...state, curCacheRoute: action.payload!.curCacheRoute });
    default:
      return state;
  }
};

export default app;
