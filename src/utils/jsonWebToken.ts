import { local } from '@utils/storage';

/**
 * 写入token等信息
 * @param {object} tokenInfo token信息
 * @param {object} userInfo 用户信息
 */
export const setToken = (tokenInfo: any, userInfo: any) => {
  local.set('access_token', tokenInfo.access_token, tokenInfo.expires_in * 1000);
  local.set('token_type', tokenInfo.token_type, tokenInfo.expires_in * 1000);
  local.set('scope', userInfo.scope, tokenInfo.expires_in * 1000);
  local.set('user', userInfo.user, tokenInfo.expires_in * 1000);
};

/**
 * 获取token
 */
export const getToken = (): any => {
  return {
    access_token: local.get('access_token'),
    token_type: local.get('token_type'),
    scope: local.get('scope'),
    user: local.get('user')
  };
};
