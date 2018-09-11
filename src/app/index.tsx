import { BrowserRouter as Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import ReactDom from 'react-dom';

import { swUtils } from '@/app/utils';
import appConfig from '@/app/config';
import App from './components/App';
import configStore from './store';

import './index.less';

const store = configStore();

/**
 * OfflinePlugin config
 */
const { unregisterServiceWorker, registerRuntime } = swUtils;
const { unregisterSW } = appConfig;
registerRuntime();
unregisterSW && unregisterServiceWorker();

console.log(2);

const render = () => {
  ReactDom.render(
    <Provider store={store}>
      <Route>
        <App />
      </Route>
    </Provider>,
    document.getElementById('root'),
  );
};

render();
