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

const useStyles = makeStyles({
  root: {
    width: "inherit",
    textAlign: "left",
    fontFamily: "Cern",
    overflow: "auto",
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    color: grey[800],
    paddingTop: 20,
    paddingBottom: 20,
  },
  hint: {
    fontSize: 14,
    fontWeight: 500,
    color: "#808080",
    display: "flex",
    maxWidth: "50%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    outline: "none",
    border: "none",
    color: "#3e55ab",
    textDecoration: "none",
  },
  info: {
    fontSize: 18,
    color: "#000000",
    opacity: 0.8,
    paddingRight: 10,
  },
  logoutBtn: {
    marginTop: 10,
    fontFamily: "Cern",
    color: red[500],
  },
});
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
        <div className={classes.hint}>current account</div>
        <div style={{ paddingTop: 5, paddingBottom: 10 }}>{account}</div>
      </div>
      <div id="other-accounts">
        <div className={classes.hint}>
          <div>all accounts</div>
          <a className={classes.link} href="#adduser">
            Add New Account
          </a>
        </div>
        <AccountConfig />
      </div>
      <div id="logout">
        <div className={classes.hint}>Back to Login page</div>
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
