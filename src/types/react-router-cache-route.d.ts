import Router from 'react-router-cache-route';

declare module 'react-router-cache-route' {
  export interface CacheRouteProps extends Router.CacheRouteProps {
    cacheLifecycles?: {
      didCache: (listener: () => void) => void;
      didRecover: (listener: () => void) => void;
    };
  }
}
