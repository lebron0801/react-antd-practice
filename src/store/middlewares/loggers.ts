interface Action {
  /**
   * 动作类型
   */
  type: string;
  /**
   * 需要更新的数据
   */
  payload?: any;
}

const loggerMiddleware = () => {
  return (data: { dispatch: (params: Action) => void; getState: () => void }) => {
    return (next: (params: Action) => any) => {
      return (action: Action) => {
        return next(action);
      };
    };
  };
};

const logger = loggerMiddleware();

export default logger;
