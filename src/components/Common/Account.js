import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";
import AccountConfig from "./AccountList";
import AlertSnackbar from "../Utils/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { purgeCurrentUser } from "../Utils/User";
import { purgeAllTokens } from "../Utils/Tokens";
import { Redirect } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "inherit",
    textAlign: "left",
    fontFamily: "Inter",
    overflow: "auto",
  },
  title: {
    fontSize: theme.typography.pxToRem(32),
    fontWeight: 500,
    color: grey[800],
    paddingTop: theme.typography.pxToRem(30),
    paddingBottom: theme.typography.pxToRem(20),
  },
  hint: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
    color: "#808080",
    display: "flex",
    maxWidth: "50%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.typography.pxToRem(10),
  },
  link: {
    outline: "none",
    border: "none",
    color: "#3e55ab",
    textDecoration: "none",
  },
  info: {
    fontSize: theme.typography.pxToRem(18),
    color: "#000000",
    opacity: 0.8,
    paddingRight: theme.typography.pxToRem(10),
  },
  logoutBtn: {
    marginTop: theme.typography.pxToRem(10),
    fontFamily: "Inter",
    color: red[500],
  },
  hintSub: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    color: "#000000",
    opacity: 0.4,
    paddingTop: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(10),
  },
}));

function Account() {
  const classes = useStyles();
  const account = localStorage.getItem("CURR_ACCOUNT");
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setAuthToken } = useAuth();

  const handleLogout = () => {
    purgeCurrentUser();
    purgeAllTokens();
    setAuthToken(false);
    return <Redirect to="#" />;
  };

  return (
    <div id="account-root" className={classes.root}>
      <div id="account-name" className={classes.title}>
        <div className={classes.hint}>Logged in as</div>
        <div style={{ paddingTop: 5, paddingBottom: 10 }}>{account}</div>
      </div>
      <div id="other-accounts">
        <div className={classes.hint}>
          <div>Accounts Configurations</div>
          <a className={classes.link} href="#adduser">
            Add New Account
          </a>
        </div>
        <div className={classes.hintSub}>
          Manage client configurations for Rucio
        </div>
        <AccountConfig />
      </div>
      <div id="logout">
        <div className={classes.hint}>Back to Login page</div>
        <div className={classes.hintSub}>
          This will log you out from all Rucio servers
        </div>
        <Button
          className={classes.logoutBtn}
          color="inherit"
          variant="outlined"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <AlertSnackbar
        message="Settings Saved"
        severity="success"
        open={storeState.snackbar}
        onExited={() => dispatch({ type: "HIDE_SNACKBAR" })}
      />
    </div>
  );
}

export default Account;
