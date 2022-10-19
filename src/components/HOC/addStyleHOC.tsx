import React from 'react';

const addStyleHOC = (WrappedComponent: any) => {
  return class extends React.Component {
    render(): React.ReactNode {
      return (
        <div className="addStyle" style={{ color: 'blue' }}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default addStyleHOC;
