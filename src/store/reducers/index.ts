import { combineReducers } from 'redux';
import app, { AppInitState } from './app';
import user, { UserInitState } from './user';

export interface ReduxStateInterface {
  app: AppInitState;
  user: UserInitState;
}

export default combineReducers({ app, user });
