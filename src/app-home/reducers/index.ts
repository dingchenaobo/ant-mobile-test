import { handleActions } from 'redux-actions';

import actions from '../actions';

interface IinitialState {
  test: any;
}

const initialState: IinitialState = {
  test: null,
};

export default handleActions({
  [actions.test](state: IinitialState, { error, payload }) {
    if (!error) {
      return {
        ...state,
        test: payload,
      };
    }
    return handleError(state, { error, payload });
  },
}, { ...initialState });

function handleError(state: any, p: { error: any, payload: any }) {
  console.error(p);
  return state;
}
