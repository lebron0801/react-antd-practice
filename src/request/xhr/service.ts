import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import showStatus from './httpErrorHandler';
import qs from 'querystring';
import { local } from '@utils/storage';

const service: any = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_URL,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    put: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    delete: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  method: 'post',
  // 告诉浏览器是否发送Cookie
  withCredentials: false,
  timeout: 30000,
  transformRequest: [
    (data) => {
      data = JSON.stringify(data);
      return data;
    }
  ],
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true;
  },
  transformResponse: [
    (data) => {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data);
      }
      return data;
    }
  ]
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      config.transformRequest = [];
    }

    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.transformRequest = [
        (data) => {
          data = qs.stringify(data);
          return data;
        }
      ];
    }

    // config.headers['Authorization'] = `${local.get('token_type')} ${local.get('access_token')}`;

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const status = response.status; // 服务器状态码
    if (status < 200 || status >= 300) {
      showStatus(status);
    }

    return response.data;
  },
  (error: any) => {
    showStatus(error.status);

    return Promise.reject(error);
  }
);

export default service;
