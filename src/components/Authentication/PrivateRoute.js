/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

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
