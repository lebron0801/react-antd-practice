import React from 'react';
import { getDisplayName } from './utils';

function withSubscription(WrappedComponent: any, filterData: any) {
  return class WithSubscription extends React.Component<any, any> {
    constructor(props: any) {
      super(props);

      this.state = {
        data: filterData(props.dataSource, props.id)
      };
    }

    render(): React.ReactNode {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }

    static displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  };
}

export default withSubscription;
