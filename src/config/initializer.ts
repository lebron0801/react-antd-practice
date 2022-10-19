import store from '@/store';
import { updateUser } from '@/store/actions';

export default () => {
  store.dispatch(updateUser({ account: '默认值' }));
};
