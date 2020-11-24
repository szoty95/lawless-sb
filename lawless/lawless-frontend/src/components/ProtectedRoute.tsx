import React from "react";
import type { RouteProps } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

type Props = RouteProps & {
  guard?: boolean;
};

const ProtectedRoute: React.FC<Props> = ({
  guard = false,
  children,
  ...rest
}) => {
  const { user } = useUserContext();
  if (guard) {
    return user ? (
      <Route {...rest}>{children}</Route>
    ) : (
      <Redirect to="/login" />
    );
  }
  return user ? <Redirect to="/" /> : <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
