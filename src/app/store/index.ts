import { combineReducers, createStore, Store } from 'redux';

import reducers from '../reducers';

export default function configStore(initialState?: any): Store {
  const store = createStore(
    combineReducers(reducers),
    initialState,
  );
  return store;
}
