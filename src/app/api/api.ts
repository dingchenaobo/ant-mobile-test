import { AxiosPromise, AxiosRequestConfig } from 'axios';

export interface IApiMethod {
  getUserList(_params?: object, config?: AxiosRequestConfig): AxiosPromise;
}

export default {
  getUserList: {
    url: 'https://raw.githubusercontent.com/AandK/mock_web_json/master/1.json',
    method: 'get',
  },
};
