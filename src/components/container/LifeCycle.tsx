import React from 'react';
import memoize from 'memoize-one';

type PropsType = {
  list: Array<ListData>;
  title: string;
};

interface ListData {
  text: string;
  id: string;
}

type StateType = {
  filterText: string;
};

class LifeCycle extends React.Component<PropsType, StateType> {
  refInd: React.RefObject<any>;
  bbbb: React.RefObject<any>;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      filterText: '哈哈哈'
    };

    this.refInd = React.createRef();

    this.bbbb = React.createRef();

    console.log('准备实例化');
  }

  static defaultProps = {
    list: [],
    title: '默认'
  };

  // 挂载阶段---更新阶段
  static getDerivedStateFromProps(props: PropsType, state: StateType) {
    console.log('组件获取派生状态数据');
    return null;
  }

  // 更新阶段
  shouldComponentUpdate(nextProps: PropsType, nextState: StateType) {
    console.log('判断是否需要更新语句');
    return true;
  }

  // 挂载阶段
  componentDidMount() {
    console.log('初始化挂载完成');
  }

  // 更新阶段
  getSnapshotBeforeUpdate(prevProps: PropsType, prevState: StateType) {
    console.log('获取更新前的快照');
    return { name: '张三', age: 23 };
  }

  // 更新阶段
  componentDidUpdate(prevProps: PropsType, prevState: StateType, snapshot?: any) {
    console.log('回调', snapshot);
    console.log('组件被更新了');
  }

  // 卸载阶段
  componentWillUnmount() {
    console.log('组件即将卸载');
  }

  // 缓存函数
  filter = memoize((list, filterText) => list.filter((item: any) => item.text.includes(filterText)));

  // 挂载阶段---更新阶段
  render(): React.ReactNode {
    console.log('渲染函数');

    const filteredList: Array<ListData> = this.filter(this.props.list, this.state.filterText);

    return (
      <div className="life-cycle-wrapper">
        <React.Fragment>
          <ul>
            {filteredList.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
          <div ref={this.refInd}>{this.props.title}</div>
          <div
            ref={this.bbbb}
            id="some-element-you-want-to-animate"
            style={{ height: 30, width: 30, backgroundColor: 'red' }}
          ></div>
        </React.Fragment>
      </div>
    );
  }
}

export default LifeCycle;
