import { AxiosRequestConfig, AxiosResponse } from 'axios';

const Interceptor = {
  request: async (config: AxiosRequestConfig) => {
    return config;
  },
  response: async (config: AxiosResponse) => {
    return config;
  },
};

export default Interceptor;
