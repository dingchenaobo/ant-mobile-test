import { createActions } from '../../app/actions';
import { AxiosPromise, AxiosResponse } from 'axios';

import api from '../../app/api';

import meta from '../meta';

export default createActions(meta.id, {
  async test(params: any): Promise<any> {
    const resp = await api.getUserList(params);
    return resp;
  },
});
