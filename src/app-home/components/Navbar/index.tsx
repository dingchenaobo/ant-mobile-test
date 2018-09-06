import { Link } from 'react-router-dom';
import React, { PureComponent, ReactNode } from 'react';
import { NavBar, Icon } from 'antd-mobile';

import styles from './index.less';

interface IAppHomeProps {
  rightContent: ReactNode[];
  icon?: ReactNode;
}

interface IAppHomeStates { }

class Navbar extends PureComponent<IAppHomeProps, IAppHomeStates> {
  render(): ReactNode {
    const { rightContent, icon } = this.props;
    return (
      <NavBar
        icon={(
          icon ||
          <img src="https://zos.alipayobjects.com/rmsportal/RfxDFanyfhEhOkynbPXizskAQqkPmPkR.png" />
        )}
        className={styles.navbar}
        rightContent={rightContent}
      />
    );
  }
}

export default Navbar;
