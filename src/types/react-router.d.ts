import Router from 'react-router-dom';

declare module 'react-router-dom' {
  export interface RouteComponentProps extends Router.RouteComponentProps {
    meta?: any;
  }
}
