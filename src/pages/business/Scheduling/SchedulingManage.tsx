import React, { SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Test1 from '@/components/container/Test1';
import { Button } from 'antd';

type StateProps = {
  list: Record<string, any>[];
  count: number;
};

class SchedulingManage extends React.Component<RouteComponentProps, StateProps> {
  state = {
    list: [
      { id: '12312', name: '张三', age: 123 },
      { id: '55644', name: '李四', age: 98 },
      { id: '233444', name: '王五', age: 77 }
    ],
    count: 0
  };

  componentDidMount() {
    // console.log('路由参数', this.props);
  }

  lebron = () => {};

  render() {
    return (
      <div className="scheduling-manage-wrapper">
        <span>排班管理</span>
        <p>数量: {this.state.count}</p>
        <Button
          onClick={(e: SyntheticEvent) => {
            this.setState((state) => ({ count: state.count + 1 }));
          }}
        >
          改变
        </Button>
        <Test1 visible={true} title="默认标题" list={this.state.list} cb={this.lebron} />
      </div>
    );
  }
}

export default SchedulingManage;
