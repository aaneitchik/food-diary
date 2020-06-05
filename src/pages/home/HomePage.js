import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';
import { ROUTE_DIARY, ROUTE_HOME, ROUTE_NEW_ENTRY } from '../../routes';
import NewEntryPage from '../new-entry/NewEntryPage';
import DiaryPage from '../diary/DiaryPage';

const HomePage = () => {
  return (
    <>
      <div className="home">
        <Switch>
          <Redirect exact path={ROUTE_HOME} to={ROUTE_DIARY} />
          <Route path={ROUTE_DIARY} component={DiaryPage} />
          <Route path={ROUTE_NEW_ENTRY} component={NewEntryPage} />
        </Switch>
      </div>
      <Navigation />
    </>
  );
};

export default HomePage;
