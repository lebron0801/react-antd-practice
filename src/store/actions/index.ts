import { UPDATE_USER, SET_LANG, SET_HOME, SET_CUR_CACHE_ROUTE, FETCH_USER, UPDATE_USER_ASYNC } from '@/constants/store';
import { ReduxStateInterface } from '@/store/reducers';
import { Dispatch, AnyAction } from 'redux';
import { getUserInfo } from '@/apis/auth';
import { getToken } from '@/utils/jsonWebToken';

type ReturnFunc = () => AnyAction;

export interface ActionCreatorFunc {
  updateUser: (payload: any) => AnyAction;
  setLang: ReturnFunc;
  setHome: ReturnFunc;
  setCurCacheRoute: ReturnFunc;
  updateUserAsync: ReturnFunc;
  fetchUser: ReturnFunc;
  getUser: (data?: any) => Promise<void>;
}

// 以下是普通的Action Creator, 不基于任何中间件
export const updateUser = (payload: any) => ({ type: UPDATE_USER, payload });
export const setLang = () => ({ type: SET_LANG });
export const setHome = () => ({ type: SET_HOME });
export const setCurCacheRoute = (payload: any) => ({ type: SET_CUR_CACHE_ROUTE, payload });

// 以下基于redux-saga中间件来实现的Action Creator
export const updateUserAsync = () => ({ type: UPDATE_USER_ASYNC });
export const fetchUser = () => ({ type: FETCH_USER });

// 以下基于redux-thunk中间件来实现的Action Creator
export const getUser = (data?: any) => async (dispatch: Dispatch, getState: () => ReduxStateInterface) => {
  const res = await getUserInfo(getToken());
  dispatch({ type: UPDATE_USER, payload: { account: res.scope } });
};
