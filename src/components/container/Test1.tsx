import React from 'react';

type PropsType = {
  visible: boolean;
  title: string;
  list?: Record<string, any>[];
  cb?: () => void;
};

class Test1 extends React.PureComponent<PropsType> {
  render() {
    console.log('组件开始更新');
    return (
      <div className="test">
        <ul>
          {this.props.list?.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Test1;
