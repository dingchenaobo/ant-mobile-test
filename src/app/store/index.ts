declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

import { combineReducers, createStore, Store } from 'redux';

import reducers from '../reducers';

export default function configStore(): Store {
  const store = createStore(
    combineReducers(reducers),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store;
}
