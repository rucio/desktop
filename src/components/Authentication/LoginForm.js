/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LogoDark from "../../layout/LogoDark";
import LoginInput from "./LoginInput";
import LoginSnackbar from "./LoginSnackbar";
import { useAuth } from "./AuthContext";
import { login } from "../Utils/Authentication";
import { authTokensPresent, saveCurrentUser } from "../Utils/User";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    fontFamily: "Inter",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: theme.typography.pxToRem(28),
    fontWeight: 300,
    padding: theme.typography.pxToRem(20),
    margin: theme.typography.pxToRem(50),
    marginBottom: theme.typography.pxToRem(0),
    marginTop: theme.typography.pxToRem(10),
  },
  logo: {
    marginTop: theme.typography.pxToRem(60),
    height: theme.typography.pxToRem(50),
  },
  icon: {
    marginTop: theme.typography.pxToRem(8),
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState();
  const { setAuthToken } = useAuth();
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();
  const auth = authTokensPresent();

  React.useEffect(() => {
    setAuthToken(auth);
  }, [setAuthToken, auth]);

  /**
   * Handles the Login event on form submit.
   */
  function handleSubmit(event, authtype, account, username, password) {
    if (loading) return;
    event.preventDefault();
    setLoading(true);
    login(authtype, account, username, password)
      .then(() => {
        setLoading(loading ? false : null);
        saveCurrentUser(authtype, account, username, password);
        dispatch({ type: "SUCCESS" });
        dispatch({ type: "SHOW_SNACKBAR" });
      })
      .catch((err) => {
        setLoading(loading ? false : null);
        const errorcode = Number(err.toString().split(" ").pop());
        if (errorcode === 401) {
          dispatch({ type: "UNAUTHORIZED" });
          dispatch({ type: "SHOW_SNACKBAR" });
        } else if (errorcode === 500) {
          dispatch({ type: "SERVER_ERR" });
          dispatch({ type: "SHOW_SNACKBAR" });
        } else console.log(err);
      });
  }

  if (storeState.login) {
    return <Redirect to="/app/explore" />;
  }

  return (
    <React.Fragment>
      <div id="login-form" className={classes.root}>
        <LogoDark className={classes.logo} />
        <div id="header" className={classes.header}>
          <IconButton href="/" className={classes.icon}>
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <div id="title" className={classes.title}>
            Login with {props.privilege} rights
          </div>
        </div>
        <LoginInput loading={loading} handleSubmit={handleSubmit} />
        <LoginSnackbar />
      </div>
    </React.Fragment>
  );
}

LoginForm.propTypes = {
  privilege: PropTypes.string,
};

export default LoginForm;
