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
import { Route } from "react-router-dom";
import Landing from "../components/Common/Landing";

function AppLayout() {
  return (
    <React.Fragment>
        <Route
          path="/app/explore"
          component={() => <Landing page="Explore" />}
        />
        <Route
          path="/app/storage"
          component={() => <Landing page="Storage" />}
        />
        <Route
          path="/app/settings"
          component={() => <Landing page="Settings" />}
        />
        <Route
          path="/app/account"
          component={() => <Landing page="Account" />}
        />
    </React.Fragment>
  );
}

export default AppLayout;
