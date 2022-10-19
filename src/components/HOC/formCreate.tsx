import React from 'react';

const formCreate =
  (config: any) =>
  (WrappedComponent: any): any =>
    class extends WrappedComponent {
      render() {
        const { style = {} } = config;
        const elementsTree = super.render();
        console.log(elementsTree);

        if (config.type === 'add-style') {
          return <div style={{ ...config.style }}>{elementsTree}</div>;
        }

        return elementsTree;
      }
    };

export default formCreate;
