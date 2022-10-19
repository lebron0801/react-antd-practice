import React from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser, updateUserAsync, fetchUser, getUser, ActionCreatorFunc } from '@/store/actions';
import { ReduxStateInterface } from '@/store/reducers';

type PropsType = ActionCreatorFunc & ReduxStateInterface & RouteComponentProps;

class SchedulingList extends React.Component<PropsType> {
  render() {
    const { user, updateUser, updateUserAsync, fetchUser, getUser } = this.props;

    return (
      <div className="scheduling-list-wrapper">
        <span>排班列表：</span>
        <span>{user.account}</span>
        <div style={{ marginTop: 20 }}>
          <Button onClick={updateUser.bind(this, { account: 'lebron' })}>同步更新</Button>
          <Button onClick={updateUserAsync}>异步更新</Button>
          <Button onClick={fetchUser}>获取</Button>
          <Button onClick={getUser}>查询</Button>
        </div>
      </div>
    );
  }
}

/**
 * 将管理器中状态数据按需映射到当前组件中
 * @param state 状态管理器全量数据
 */
const mapStateToProps = (state: ReduxStateInterface) => {
  return {
    user: state.user,
    app: state.app
  };
};

// 将管理器中dispatch函数映射到当前组件中，支持对象和函数方式
const mapDispatchToProps = { updateUser, updateUserAsync, fetchUser, getUser };

export default connect(mapStateToProps, mapDispatchToProps)(SchedulingList);
