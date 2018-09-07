import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import React, { PureComponent, ReactNode } from 'react';
import { Drawer, Icon } from 'antd-mobile';

import { connect } from '../../index';
import actions from '../../actions';
import Avatar from '../../../app/components/Avatar';
import Navbar from '../Navbar';
import Carousel from '../Carousel';
import Menu from '../Menu';

import styles from './index.less';

interface IAppHomeProps {
  actions: {
    test: Function;
  };
}

interface IAppHomeStates {
  docked: boolean;
}

class AppHome extends PureComponent<IAppHomeProps, IAppHomeStates> {
  public state = {
    docked: false,
  };

  public componentDidMount() {
    this.loadData();
  }

  // test request
  private async loadData() {
    const {
      test,
    } = this.props.actions;
    test();
  }

  public onDock(): void {
    const { docked } = this.state;
    this.setState({ docked: !docked });
  }

  public renderNavbar(): ReactNode {
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

  public renderDrawer(): ReactNode {
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
  public renderContent(): ReactNode {
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

  public render(): ReactNode {
    return (
      <div>
        {this.renderNavbar()}
        {this.renderDrawer()}
      </div>
    );
  }
}

export default connect(
  (state: any) => ({ ...state }),
  (dispatch: any) => ({ actions: bindActionCreators(actions, dispatch) }),
)(AppHome);
