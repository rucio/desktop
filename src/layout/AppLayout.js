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
