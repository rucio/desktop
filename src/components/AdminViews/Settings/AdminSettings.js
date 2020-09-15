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
import { makeStyles } from "@material-ui/core";
import ServerList from "./ServerList";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "40%",
    maxWidth: "60%",
    paddingTop: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(10),
    fontFamily: "Inter",
  },
  title: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
    color: "#000000",
    opacity: 0.6,
    paddingTop: theme.typography.pxToRem(20)
  },
  hint: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    color: "#000000",
    opacity: 0.4,
    paddingTop: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(10)
  }
}));

function AdminSettings() {
  const classes = useStyles();
  return (
    <div id="admin-settings" className={classes.root}>
      <div id="title" className={classes.title}>
        Servers
      </div>
      <div className={classes.hint}>Manage your server configurations</div>
      <ServerList />
    </div>
  );
}

export default AdminSettings;
