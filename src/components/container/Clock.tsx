import React from 'react';

type StateType = {
  date: Date;
};

type PropsType = {
  times: number;
  children?: React.ReactNode;
};

class Clock extends React.Component<PropsType, StateType> {
  static defaultProps = {
    times: 1
  };

  constructor(props: PropsType) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  timeId: any = null;

  componentDidMount() {
    this.timeId = setInterval(() => this.tick(), this.props.times * 1000);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  render(): React.ReactNode {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        {this.props.children}
      </div>
    );
  }
}

export default Clock;
