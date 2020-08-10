import React from "react";
import PropTypes from 'prop-types'
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { authToken } = useAuth();

  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) =>
          authToken ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </React.Fragment>
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func
}

export default PrivateRoute;
