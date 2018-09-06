import React, { PureComponent, ReactNode } from 'react';
import { List } from 'antd-mobile';

import styles from './index.less';

const ListItem = List.Item;

interface IMyCarouselProps { }

interface IMyCarouselStates { }

class Menu extends PureComponent<IMyCarouselProps, IMyCarouselStates> {
  render(): ReactNode {
    return (
      <div className={styles.container}>
        <List renderHeader={() => 'Basic Style'} className="my-list">
          <ListItem extra={'extra content'}>Title</ListItem>
        </List>
        <List renderHeader={() => 'Subtitle'} className="my-list">
          <ListItem arrow="horizontal" multipleLine={true} onClick={() => { }}>
            Title
          </ListItem>
          <ListItem
            arrow="horizontal"
            multipleLine={true}
            onClick={() => { }}
            platform="android"
          >
            ListItem （Android
          </ListItem>
          <ListItem
            arrow="horizontal"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine={true}
            onClick={() => { }}
          >
            Title
          </ListItem>
        </List>
      </div>
    );
  }
}

export default Menu;
