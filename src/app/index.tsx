import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Route } from 'react-router-dom';

import App from './components/App';

import 'antd-mobile/dist/antd-mobile.css';
import './index.less';

const render = () => {
  ReactDom.render(
    <Route>
      <App />
    </Route>,
    document.getElementById('root'),
  );
};

render();
