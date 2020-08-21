import React from "react";
import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  styles: {
    marginLeft: theme.typography.pxToRem(15),
    color: "#fffafa",
  },
  buttonStyle: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    fontFamily: "Inter",
    fontWeight: 500,
    marginTop: theme.typography.pxToRem(20),
  },
}));

function LoginButton(props) {
  const classes = useStyles();
  const { children, loading, ...rest } = props;
  return (
    <Button className={classes.buttonStyle} {...rest}>
      {children}
      {loading && <CircularProgress className={classes.styles} size="15rem" />}
    </Button>
  );
}

LoginButton.propTypes ={
  children: PropTypes.any,
  loading: PropTypes.bool.isRequired
}

export default LoginButton;
