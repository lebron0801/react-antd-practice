import { FC } from 'react';
import '@/assets/less/exceptions/Error404.less';

const Error404: FC = () => {
  const imgs = require('@assets/images/404.svg').default;
  return (
    <div className="Error404">
      <div className="image">
        <img alt="" src={imgs} />
      </div>
      <div className="desc">
        <span>404</span>
      </div>
    </div>
  );
};

export default Error404;
