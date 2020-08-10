import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LogoDark from "../../../layout/LogoDark";

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
  }
}));

function ServerDetails(props) {
  const classes = useStyles();

  function next(e) {
    e.preventDefault();
    props.nextStep();
  }

  function back(e) {
    e.preventDefault();
    props.prevStep();
  }

  function validateForm() {
    return props.serverName.length > 0 && props.rucioHost.length > 0 && props.authHost.length > 0;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <LogoDark className={classes.logo}/>
        <div className={classes.title}>Add a new account</div>
        <div className={classes.subtitle}>
          Enter server details for your account.
        </div>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="servername"
            label="Server Name"
            name="servername"
            autoFocus
            helperText="Same as FUSE/RucioFS cfg filename"
            defaultValue={props.serverName}
            onChange={(e) => props.setServerName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="host"
            label="Rucio Host"
            type="text"
            id="rucioHost"
            defaultValue={props.rucioHost}
            onChange={(e) => props.setRucioHost(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="auth"
            label="Auth Host"
            type="text"
            id="authHost"
            defaultValue={props.authHost}
            onChange={(e) => props.setAuthHost(e.target.value)}
          />
        </form>
        <ButtonGroup>
          <Button
            className={classes.submit}
            variant="outlined"
            color="primary"
            onClick={back}
          >
            <Typography className={classes.buttonPrimary}>Prev:</Typography>
            <Typography className={classes.buttonSecondary}>
              Account
            </Typography>
          </Button>
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            onClick={next}
            disabled={!validateForm()}
          >
            <Typography className={classes.buttonPrimary}>Next:</Typography>
            <Typography className={classes.buttonSecondary}>
              Certificates
            </Typography>
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}

export default ServerDetails;
