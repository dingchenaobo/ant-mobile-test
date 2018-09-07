import { combineReducers, createStore, Store } from 'redux';

export default function configStore(initialState?: any): Store {
  const store = createStore(
    combineReducers({}),
    initialState,
  );
  return store;
}
