import React, { PureComponent } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';

import styles from './index.less';

class App extends PureComponent {
  public render() {
    const title = '标题';
    console.log(title, styles, styles.title);
    return (
      <div>
        <h1 className={styles.title}>测试{title}</h1>
        <WhiteSpace />
        <Button type="primary">测试</Button>
      </div>
    );
  }
}

export default App;
