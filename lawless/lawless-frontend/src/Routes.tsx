import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import CaffsPage from './pages/CaffsPage';
import LoginPage from './pages/LoginPage';
import AnimationDetailPage from './pages/AnimationDetailPage';
import NotFound from './pages/NotFound';
import Page from './pages/Page';

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/login">
        <LoginPage />
      </ProtectedRoute>

      <Route guard path="/animations">
        <CaffsPage />
      </Route>

      <Route guard path="/animation/:caffId" component={AnimationDetailPage} />

      <ProtectedRoute guard exact path="/">
        <Page title="Main">
          <Link to="/animation/3">animation</Link>
        </Page>
      </ProtectedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
