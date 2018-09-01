import * as React from 'react';
import * as ReactDom from 'react-dom';

import App from './components/App';

import 'antd-mobile/dist/antd-mobile.css';
import './index.less';

const render = () => {
  ReactDom.render(
    <App />,
    document.getElementById('root'),
  );
};

render();
