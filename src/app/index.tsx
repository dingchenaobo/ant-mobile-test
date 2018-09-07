import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import configStore from './store';
import App from './components/App';

import 'antd-mobile/dist/antd-mobile.css';
import './index.less';

const store = configStore();

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
