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

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    fontFamily: "Cern",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: 200,
    padding: 20,
    margin: 50,
    marginBottom: 0,
    marginTop: 10,
  },
  logo: {
    marginTop: 60,
    height: 50,
  },
  icon: {
    marginTop: 8,
  },
});

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
