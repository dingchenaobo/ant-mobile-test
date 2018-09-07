import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const Interceptor = {
  request: [
    async (config: AxiosRequestConfig) => {
      return config;
    },
    async (error: any) => {
      console.error('请求异常: ', error);
      throw new Error(error);
    },
  ],
  response: [
    async (response: AxiosResponse) => {
      return response;
    },
    async (error: any) => {
      console.error('响应异常: ', error);
      throw new Error(error);
    },
  ],
};

export default Interceptor;
