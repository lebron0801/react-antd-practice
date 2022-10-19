import React from 'react';
import formCreate from '..//HOC/formCreate';
import addFuncHOC from '../HOC/addFuncHOC';
import addStyleHOC from '../HOC/addStyleHOC';
import { compose } from '../HOC/utils';
import Clock from './Clock';
import TextInput from '../function/TextInput';
import LifeCycle from './LifeCycle';

const WrappedComponent = compose(addFuncHOC, addStyleHOC)(Clock);

@formCreate({ type: 'add-style', style: { color: 'red' } })
class Lebron extends React.Component<any, any> {
  aaa: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      lebron: '中国',
      other: [
        { id: '123', text: 'heiheihie' },
        { id: '456', text: '哈哈哈' },
        { id: '789', text: '擦擦啊' }
      ]
    };

    console.log('父组件初始化完成');

    this.aaa = React.createRef();
  }

  componentDidMount() {
    console.log('didMount');
    this.aaa.current!.focus();
  }

  render(): React.ReactNode {
    return (
      <div>
        <span>dasdasdasdas</span>
        <WrappedComponent />
        <TextInput ref={this.aaa}>
          <Clock />
        </TextInput>
        <div>{this.state.lebron}</div>
        <LifeCycle list={this.state.other} title="中国" />
        <button
          onClick={() => {
            this.setState(
              (state: any, props: any) => ({
                lebron: state.lebron + '增加'
              }),
              () => {
                console.log('子组件更新完成');
              }
            );
          }}
        >
          改变
        </button>
      </div>
    );
  }
}

export default Lebron;
