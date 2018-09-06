import React, { PureComponent } from 'react';
import { SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';

import styles from './index.less';

class AppSearch extends PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', background: '#efeff4' }}>
        <div style={{ flex: 1 }}>
          <SearchBar placeholder="搜索感兴趣的岗位或课程" maxLength={8} />
        </div>
        <div className={styles.back}>
          <Link to="/">返回首页</Link>
        </div>
      </div>
    );
  }
}

export default AppSearch;
