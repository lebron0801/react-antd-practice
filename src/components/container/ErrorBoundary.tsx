import React from 'react';

type StateType = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
