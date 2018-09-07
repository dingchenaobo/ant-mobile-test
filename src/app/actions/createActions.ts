import { createAction, Action, ActionFunction0 as ActionFunction } from 'redux-actions';
import { AxiosPromise, AxiosResponse } from 'axios';

const createActions = (prefix: string, actions: { [key: string]: (params: any) => AxiosPromise<any> }): any => {
  return Object.keys(actions).reduce((results: object, key: string) => {
    results[key] = createAction(`${prefix}_${key}`, actions[key]);
    return results;
  }, {});
};

export default createActions;
