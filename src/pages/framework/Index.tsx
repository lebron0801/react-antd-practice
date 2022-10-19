import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import FrameworkBase from '@/layouts/FrameworkBase';

class Index extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div className="index-wrapper">
        <FrameworkBase />
      </div>
    );
  }
}

export default Index;
