import xhr from '@/request';

/**
 * 拉取用户信息
 */
export const FetchUser = (data: any) =>
  xhr({
    url: '/getUser/accountInof',
    data
  });
