import { ReducersMapObject } from 'redux';
import { meta as appHomeMeta, reducer as assessResultMetaReducer } from '../../app-home';

const reducersMap: ReducersMapObject = {
  [appHomeMeta.id]: assessResultMetaReducer,
};

export default reducersMap;
