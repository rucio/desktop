import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LogoDark from "../../../layout/LogoDark";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    fontFamily: "Cern",
  },
  title: {
    fontSize: 28,
    fontWeight: 200,
    padding: 20,
    margin: 50,
    marginBottom: 0,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 0,
    marginBottom: 10,
  },
  form: {
    width: "100%",
    margin: 0,
    backgroundColor: "#fffafa",
    overflowX: "hidden",
    overflow: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonPrimary: {
    fontFamily: "Cern",
    fontSize: 14,
    fontWeight: 600,
  },
  buttonSecondary: {
    fontFamily: "Cern",
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 5,
  },
  logo: {
    marginTop: 60,
    height: 50,
  },
  hint: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
    padding: 10,
  },
}));

function UserDetails(props) {
  const classes = useStyles();

  function next(e) {
    e.preventDefault();
    props.nextStep();
  }

  /**
   * Validates the form responses to prevent empty required fields
   */
  function validateForm(authtype) {
    switch (authtype) {
      case "x509":
        return props.account.length > 0; 
      case "userpass":
        console.log(authtype)
        return (
          props.account.length > 0 &&
          props.username.length > 0 &&
          props.password.length > 0
        );
      default:
        return false;
    }
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
              defaultValue={props.username}
              autoComplete="current-username"
              onChange={(e) => props.setUsername(e.target.value)}
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
              defaultValue={props.password}
              autoComplete="current-password"
              onChange={(e) => props.setPassword(e.target.value)}
            />
          </React.Fragment>
        );
      case "x509":
        return (
          <React.Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="client-cert"
              label="Client Certificate Path"
              type="certificate"
              id="clientcert"
              defaultValue={props.clientcert}
              onChange={(e) => props.setClientcert(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="clientkey"
              label="Client Key Path"
              type="key"
              id="clientkey"
              defaultValue={props.clientkey}
              onChange={(e) => props.setClientkey(e.target.value)}
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
      <div className={classes.paper}>
        <LogoDark className={classes.logo} />
        <div className={classes.title}>Add a new account</div>
        <div className={classes.subtitle}>Enter your Rucio Account details</div>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="account"
            label="Account"
            name="account"
            autoComplete="account"
            defaultValue={props.account}
            autoFocus
            onChange={(e) => props.setAccount(e.target.value)}
          />
          <div className={classes.hint}>
            Select Preferred Identity for this account
          </div>
          <ButtonGroup>
            <Button
              onClick={() => props.setAuthtype("x509")}
              color="primary"
              variant="outlined"
              size="large"
            >
              <CardMembershipIcon fontSize="small" style={{ margin: 10 }} />
              X509 Certificate
            </Button>
            <Button
              onClick={() => props.setAuthtype("userpass")}
              color="primary"
              variant="outlined"
              size="large"
            >
              <VpnKeyIcon fontSize="small" style={{ margin: 10 }} />
              USERPASS
            </Button>
          </ButtonGroup>
          {showIdentityInput(props.authtype)}
        </form>
        <ButtonGroup>
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            href="/"
          >
            <Typography className={classes.buttonSecondary}>Cancel</Typography>
          </Button>
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            onClick={next}
            disabled={!validateForm(props.authtype)}
          >
            <Typography className={classes.buttonPrimary}>Next:</Typography>
            <Typography className={classes.buttonSecondary}>
              Server Details
            </Typography>
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}

UserDetails.propTypes = {
  nextStep: PropTypes.func,
  account: PropTypes.string,
  setAccount: PropTypes.func,
  username: PropTypes.string,
  setUsername: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  authtype: PropTypes.string,
  setAuthtype: PropTypes.func,
  clientcert: PropTypes.string,
  setClientcert: PropTypes.func,
  clientkey: PropTypes.string,
  setClientkey: PropTypes.func,
};

export default UserDetails;
