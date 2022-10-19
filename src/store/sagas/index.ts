import { all } from 'redux-saga/effects';
import fetchUser from './fetchUser';
import user from './user';

export default function* rootSaga() {
  // 同时并发多个 action
  yield all([...fetchUser, ...user]);
}
