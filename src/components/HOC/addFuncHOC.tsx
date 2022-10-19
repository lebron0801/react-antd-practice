import React from 'react';

const addFuncHOC = (WrappedComponent: any) => {
  return class extends React.Component {
    handleClick() {
      console.log('click');
    }

    render(): React.ReactNode {
      const props = { ...this.props, handleClick: this.handleClick };
      return (
        <div className="addFunc">
          <WrappedComponent {...props} />
        </div>
      );
    }
  };
};

export default addFuncHOC;
