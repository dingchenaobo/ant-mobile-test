import React, { PureComponent, ReactNode, MouseEventHandler } from 'react';

import styles from './index.less';

interface IAppProps {
  url?: string;
  onClick?: MouseEventHandler;
}
interface IAppStates {}

class App extends PureComponent<IAppProps, IAppStates> {
  public render():ReactNode {
    const { url, onClick } = this.props;
    return (
      <div onClick={onClick}>
        <div className={styles.container} />
      </div>
    );
  }
}

export default App;
