import { UPDATE_USER } from '@/constants/store';

const initState = {
  account: 'admin',
  email: '默认邮箱',
  time: '2020-10-01'
};

export type UserInitState = {
  /**
   * 账号
   */
  account: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 登录时间
   */
  time: string;
};

type Action = {
  /**
   * 动作类型
   */
  type: string;
  /**
   * 需要更新的数据
   */
  payload?: UserInitState;
};

const user = (state: UserInitState = initState, action: Action = { type: '' }) => {
  switch (action.type) {
    case UPDATE_USER:
      return (state = { ...state, ...action.payload });
    default:
      return state;
  }
};

export default user;
