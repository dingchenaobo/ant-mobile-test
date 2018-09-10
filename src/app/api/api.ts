import { AxiosPromise, AxiosRequestConfig } from 'axios';

export interface IApiMethod {
  getUserList(_params?: object, config?: AxiosRequestConfig): AxiosPromise;
}

export default {
  getUserList: {
    url: '/user',
    method: 'get',
  },
};
