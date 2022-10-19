import { FETCH_USER, UPDATE_USER } from '@/constants/store';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserInfo } from '@/apis/auth';
import { getToken } from '@/utils/jsonWebToken';

function* updateUser() {
  const res: { scope: string } = yield call(getUserInfo, getToken());
  // dispatch 一个 action 到 reducer
  yield put({ type: UPDATE_USER, payload: { account: res.scope } });
}

function* fetchUser() {
  // 启动saga后, 节流监听此action
  yield takeLatest(FETCH_USER, updateUser);
}

export default [fetchUser()];
