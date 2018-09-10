import { connect as reduxConnect } from 'react-redux';

import meta from './meta';

export { default } from './components/Page';
export { default as meta } from './meta';
export { default as reducer } from './reducers';

export function connect(
  mapStateToProps = (state: any) => ({}),
  mapDispatchToProps: any,
) {
  return reduxConnect(
    (state: any) => mapStateToProps({
      ...state[meta.id],
    }),
    mapDispatchToProps,
  );
}
