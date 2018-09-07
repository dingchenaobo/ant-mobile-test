import { Link } from 'react-router-dom';
import React, { PureComponent, ReactNode } from 'react';
import { Drawer, Icon } from 'antd-mobile';

import api from '../../../app/api';
import Avatar from '../../../app/components/Avatar';
import Navbar from '../Navbar';
import Carousel from '../Carousel';
import Menu from '../Menu';

import styles from './index.less';

interface IAppHomeProps { }

interface IAppHomeStates {
  docked: boolean;
}

api.getUserList();

class AppHome extends PureComponent<IAppHomeProps, IAppHomeStates> {
  state = {
    docked: false,
  };

  onDock(): void {
    const { docked } = this.state;
    this.setState({ docked: !docked });
  }

  renderNavbar(): ReactNode {
    return (
      <Navbar
        rightContent={[
          <Link key={0} to="/search">
            <Icon type="search" className={styles.search} />
          </Link>,
          <Avatar key={1} onClick={() => this.onDock()} />,
        ]}
      />
    );
  }

  renderDrawer(): ReactNode {
    const { docked } = this.state;
    return (
      <Drawer
        position="right"
        open={docked}
        onOpenChange={() => this.onDock()}
        sidebar={<Menu />}
        className={styles.drawer}
        style={{ minHeight: document.documentElement.clientHeight }}
      >
        {this.renderContent()}
      </Drawer>
    );
  }

  // 内容
  renderContent(): ReactNode {
    const data = [
      {
        id: 0,
        link: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
        image: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
      },
      {
        id: 1,
        link: 'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',
        image: 'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',
      },
    ];
    return (
      <div>
        <Carousel data={data} />
      </div>
    );
  }

  render(): ReactNode {
    return (
      <div>
        {this.renderNavbar()}
        {this.renderDrawer()}
      </div>
    );
  }
}

export default AppHome;
