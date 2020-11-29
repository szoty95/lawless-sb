import React from 'react';
import { Route, Switch } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import CaffsPage from './pages/CaffsPage';
import LoginPage from './pages/LoginPage';
import AnimationDetailPage from './pages/AnimationDetailPage';
import NotFound from './pages/NotFound';

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/login">
        <LoginPage />
      </ProtectedRoute>
      <Route path="/animation/:caffId" component={AnimationDetailPage} />
      <Route path="/">
        <CaffsPage />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
