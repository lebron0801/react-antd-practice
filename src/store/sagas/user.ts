import { UPDATE_USER_ASYNC, UPDATE_USER } from '@/constants/store';
import { put, takeEvery, delay } from 'redux-saga/effects';

function* updateUser() {
  yield delay(2000); // 需要执行异步的时候，直接调用call
  // dispatch 一个 action 到 reducer
  yield put({ type: UPDATE_USER, payload: { account: '异步账户' } });
}

function* user() {
  // 启动saga后, 非节流监听此action
  yield takeEvery(UPDATE_USER_ASYNC, updateUser);
}

export default [user()];
