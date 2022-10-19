import { createFromIconfontCN } from '@ant-design/icons';
import config from '@/config/default.config';

const IconFont = createFromIconfontCN({
  scriptUrl: config.iconfontUrl
});

export default IconFont;
