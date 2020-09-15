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
import { green, red } from "@material-ui/core/colors";
import { serverStatus } from "../Utils/Servers";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Inter",
    paddingTop: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(10),
    fontSize: theme.typography.pxToRem(20),
    width: "50%",
  },
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#000000",
    opacity: 0.8,
    fontSize: theme.typography.pxToRem(16),
    flexBasis: "33.33%",
    flexShrink: 0,
    paddingTop: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(10),
  },
  statusC: {
    fontSize: theme.typography.pxToRem(16),
    color: green[600],
    fontWeight: 500,
    opacity: 1,
  },
  statusD: {
    fontSize: theme.typography.pxToRem(16),
    color: red[600],
    fontWeight: 500,
    opacity: 1,
  },
}));

function ServerList(props) {
  const classes = useStyles();
  const serverDetails = serverStatus();
  return (
    <div id="server-list" className={classes.root}>
      {serverDetails.map((item) => (
        <div key={item.server} className={classes.listItem}>
          <div>{item.server}</div>
          <div
            className={
              item.status === "Connected" ? classes.statusC : classes.statusD
            }
          >
            {item.status}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServerList;
