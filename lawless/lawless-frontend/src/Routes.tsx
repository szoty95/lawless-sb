import React from "react";
import { Switch } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import AnimationDetailPage from "./pages/AnimationDetailPage";
import LoginPage from "./pages/LoginPage";
import Page from "./pages/Page";

interface Props {}

const Routes = (props: Props) => {
  return (
    <Switch>
      <ProtectedRoute path="/login">
        <LoginPage />
      </ProtectedRoute>

      <ProtectedRoute guard exact path="/">
        <Page title="Main">Asdasd</Page>
      </ProtectedRoute>
      <ProtectedRoute path="/animation/:id">
        <AnimationDetailPage />
      </ProtectedRoute>
    </Switch>
  );
};

export default Routes;
