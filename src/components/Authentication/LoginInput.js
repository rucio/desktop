import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Button, ButtonGroup } from "@material-ui/core";
import LoginButton from "./LoginButton";
import PropTypes from "prop-types";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles((theme) => ({
  paper: {
    fontFamily: "Cern",
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 500,
    color: "#808080",
  },
  btnGrp: {
    marginTop: 10,
  },
  hint: {
    fontSize: 14,
    fontWeight: 500,
    color: "#808080",
    marginTop: 30,
  },
}));

function LoginInput(props) {
  const classes = useStyles();
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authtype, setAuthtype] = useState("userpass");

  /**
   * Validates the form responses to prevent empty required fields
   */
  function validateForm() {
    return account.length > 0 && username.length > 0 && password.length > 0;
  }

  function showIdentityInput(authtype) {
    switch (authtype) {
      case "userpass":
        return (
          <React.Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
              defaultValue={username}
              autoComplete="current-username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              defaultValue={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </React.Fragment>
        );
      default:
        return <div />;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.subtitle}>
        Using {authtype.toUpperCase()} identity
      </div>
      <form className={classes.form} onSubmit={props.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="account"
          label="Account"
          name="account"
          autoComplete="account"
          autoFocus
          onChange={(e) => setAccount(e.target.value)}
        />
        {showIdentityInput(authtype)}
        <LoginButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!validateForm()}
          className={classes.submit}
          onClick={(e) =>
            props.handleSubmit(e, authtype, account, username, password)
          }
          loading={props.loading}
        >
          Sign in
        </LoginButton>
        <div className={classes.hint}>Switch auth method?</div>
        <ButtonGroup className={classes.btnGrp}>
          <Button
            onClick={() => setAuthtype("x509")}
            color="primary"
            variant="outlined"
            size="large"
          >
            <CardMembershipIcon fontSize="small" style={{ margin: 10 }} />
            X509 Certificate
          </Button>
          <Button
            onClick={() => setAuthtype("userpass")}
            color="primary"
            variant="outlined"
            size="large"
          >
            <VpnKeyIcon fontSize="small" style={{ margin: 10 }} />
            USERPASS
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
}

LoginInput.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default LoginInput;
