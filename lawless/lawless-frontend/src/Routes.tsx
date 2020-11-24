import React from "react";
import { Switch } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Page from "./pages/Page";

interface Props {}

const Routes = (props: Props) => {
  return (
    <Switch>
      <ProtectedRoute path="/login">
        <LoginPage />
      </ProtectedRoute>

      <ProtectedRoute guard path="/">
        <Page title="Main">Asdasd</Page>
      </ProtectedRoute>
    </Switch>
  );
};

export default Routes;
