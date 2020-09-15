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
import { makeStyles, Typography, Button } from "@material-ui/core";
import LogoDark from "../../layout/LogoDark";
import LoginCard from "./LoginCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    fontFamily: "Inter",
  },
  title: {
    fontSize: theme.typography.pxToRem(28),
    fontWeight: 300,
    padding: theme.typography.pxToRem(20),
    margin: theme.typography.pxToRem(50),
    marginBottom: 0,
    marginTop: theme.typography.pxToRem(10),
  },
  subtitle: {
    fontSize: theme.typography.pxToRem(14),
    opacity: 0.6,
    marginTop: 0,
    margin: theme.typography.pxToRem(50),
  },
  loginOptions: {
    display: "flex",
    justifyContent: "space-around",
  },
  text: {
    fontFamily: "Inter",
    fontSize: theme.typography.pxToRem(14),
    opacity: 0.6,
    marginTop: theme.typography.pxToRem(50),
  },
  buttonPrimary: {
    fontFamily: "Inter",
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    padding: theme.typography.pxToRem(5),
  },
  logo: {
    marginTop: theme.typography.pxToRem(60),
    height: theme.typography.pxToRem(50),
  },
}));

function LoginScreen() {
  const classes = useStyles();

  return (
    <div id="login-root" className={classes.root}>
      <LogoDark className={classes.logo} />
      <div id="login-title" className={classes.title}>
        Log in to Rucio
      </div>
      <div id="login-subtitle" className={classes.subtitle}>
        Select a privilege level to login
      </div>
      <div id="login-as" className={classes.loginOptions}>
        <LoginCard text="Admin" iconFor="admin" link="/auth/admin" />
        <LoginCard text="User" iconFor="user" link="/auth/user" />
      </div>
      <Typography className={classes.text}>New to Rucio Desktop?</Typography>
      <Button className={classes.buttonPrimary} color="primary" href="#adduser">
        Add your rucio account
      </Button>
    </div>
  );
}

export default LoginScreen;
