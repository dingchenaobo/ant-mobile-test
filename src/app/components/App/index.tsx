import React, { PureComponent, ReactNode } from 'react';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';

import AppHome from '../../../app-home';
import AppSearch from '../../../app-search';

interface IMatchParams {}
interface IAppProps extends RouteComponentProps<IMatchParams> {}
interface IAppStates {}

class App extends PureComponent<IAppProps, IAppStates> {
  public render():ReactNode {
    return (
      <div>
        <Switch>
          <Route exact={true} path="/" component={AppHome} />
          <Route exact={true} path="/search" component={AppSearch} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
