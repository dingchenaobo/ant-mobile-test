import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

import Interceptor from './interceptors';

interface IApi { [key: string]: AxiosRequestConfig; }
interface IFacade { [key: string]: Function; }

/**
 * map api, create function.
 */
const createApiMap = (api: IApi): object => {
  const facade: IFacade = {};
  for (const name in api) {
    facade[name] = createMethod(api[name]);
  }
  return facade;
};

/**
 * @desc 真实的请求方法
 */
const createMethod = (axiosRequestConfig: AxiosRequestConfig): Function => {
  // 可能存在的内置参数
  // 如acc 的 CSRF token
  const __params: object = {};
  return (_params?: object, config: AxiosRequestConfig = {}): AxiosPromise<any> => {
    // 方法
    const method: string = axiosRequestConfig.method || 'get';
    // 参数转换
    const url: string = axiosRequestConfig.url || location.origin;
    const params = Object.assign(__params, _params);
    // 设置拦截器
    const instance: AxiosInstance = createInstance(config);
    instance.interceptors.request.use(...Interceptor.request);
    instance.interceptors.response.use(...Interceptor.response);
    /**
     * 其实应该是:
     * instance[method]({ **options** })
     * error:
     * method是无法确定的字符串
     * 检索AxiosInstance的类型
     */
    switch (method.toLocaleLowerCase()) {
      case 'get':
        config.params = params;
        return instance.get(url, config);
      case 'post':
        return instance.post(url, params, config);
      default :
        throw new Error('请添加请求方式');
    }
  };
};

/**
 * @desc 创建axios实例
 */
const createInstance = (config: AxiosRequestConfig = {}): AxiosInstance => {
  const _config = {
    withCredentials: true, // cookie 跨域
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  return axios.create(Object.assign(config, _config));
};

export default createApiMap;
