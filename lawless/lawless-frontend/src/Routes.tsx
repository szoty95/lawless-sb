import React from "react";
import { Route, Switch } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import CaffsPage from "./pages/CaffsPage";
import AnimationDetailPage from "./pages/AnimationDetailPage";
import LoginPage from "./pages/LoginPage";

interface Props {}

const Routes = (props: Props) => {
  return (
    <Switch>
      <ProtectedRoute path="/login">
        <LoginPage />
      </ProtectedRoute>
      <Route guard path="/caffs">
        <CaffsPage />
      </Route>
      <ProtectedRoute path="/animation/:id">
        <AnimationDetailPage />
      </ProtectedRoute>
    </Switch>
  );
};

export default Routes;
