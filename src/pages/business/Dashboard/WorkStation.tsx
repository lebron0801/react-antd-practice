import React from 'react';
import { Button, message, Table, Input } from 'antd';
import { getUserList, createUserForm, getUserInfo } from '@/apis/business';

type StateType = {
  configs: number;
  state?: boolean;
  columns?: Array<any>;
  value: string;
  dataSource: any;
};

class WorkStation extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);

    this.state = {
      configs: 0,
      state: false,
      value: '',
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: '密码',
          dataIndex: 'passwd',
          key: 'passwd'
        }
      ],
      dataSource: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    /* const res = await getUserList({});
		this.setState({
			dataSource: res.data
		}); */
  }

  /**
   * 更新数据
   */
  updateDates = async () => {
    const res = await getUserInfo({ name: '张三', age: 23 });
    /* const res = await deleteUserRecord({ ids: ['2c5aa916-ab61-47ef-a923-2143bd31eb88'] });
		if (res.code === 200) {
			message.success(res.msg);
		} else {
			message.error(res.msg);
		} */
    /* this.setState((state) => {
			return {
				configs: state.configs + 1
			};
		}); */
    /* const res = await createUserForm({
			email: 'cheng.wang@coho.com.cn',
			passwd: '122321',
			name: '王城',
			gender: true
		});

		if (res.code === 200) {
			message.success(res.msg);
		} else {
			message.error(res.msg);
		} */
  };

  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="workstation-wrapper">
        <span>{this.state.configs}</span>
        <Button onClick={this.updateDates} style={{ marginLeft: 10 }}>
          更新
        </Button>
        <Input placeholder="Basic usage" value={this.state.value} onChange={this.handleChange} />
        <Table dataSource={this.state.dataSource} columns={this.state.columns} />
      </div>
    );
  }
}

export default WorkStation;
