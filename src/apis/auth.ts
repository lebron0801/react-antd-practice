import xhr from '@/request/xhr';

/**
 * 用户登录，获取token
 */
export const getTokenInfo = (data: any) =>
  xhr({
    url: '/connect/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  });

/**
 * 获取用户信息
 */
export const getUserInfo = (token: any) =>
  xhr({
    url: '/connect/userinfo',
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`
    }
  });
