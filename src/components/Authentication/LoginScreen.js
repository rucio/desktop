import React from "react";
import { makeStyles, Typography, Button } from "@material-ui/core";
import LogoDark from "../../layout/LogoDark";
import LoginCard from "./LoginCard";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    fontFamily: "Inter",
  },
  title: {
    fontSize: 28,
    fontWeight: 300,
    padding: 20,
    margin: 50,
    marginBottom: 0,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 0,
    margin: 50,
  },
  loginOptions: {
    display: "flex",
    justifyContent: "space-around",
  },
  text: {
    fontFamily: "Inter",
    fontSize: 14,
    opacity: 0.6,
    marginTop: 50,
  },
  buttonPrimary: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 700,
    padding: 5,
  },
  logo: {
    marginTop: 60,
    height: 50,
  },
});

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
