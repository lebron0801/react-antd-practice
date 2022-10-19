import xhr from './xhr';
import { getToken } from '@utils/jsonWebToken';
import { merge } from '@/utils/merge';

let common: any = null;

/**
 * 处理通用数据
 */
const getCommData = async () => {
  const jwt = getToken();
  const commHead = {
    Authorization: `${jwt.token_type} ${jwt.access_token}`,
    'Accept-Language': 'zh-CN'
  };

  const baseConfig = {
    clientId: 'gGywGzvMLSjsdFjGEpIs',
    sign: 'gywAfgSrjsdFjGKHaHNYd',
    timestamp: Math.round((new Date() as any) / 1000)
  };

  return { commHead, baseConfig };
};

/**
 * 默认输出请求
 */
export default async (options: any): Promise<CommonAjaxReturnDataModel> => {
  common = await getCommData();
  options = merge({ method: 'post' }, options, {
    headers: common.commHead
  });

  if (options.method !== 'get') {
    options.data = { data: options.data, ...common.baseConfig };
  } else {
    options.params = { ...options.params, ...common.baseConfig };
  }

  return xhr(options);
};
