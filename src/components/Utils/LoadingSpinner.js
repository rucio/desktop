import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: "0.8rem",
    margin: "0.5rem",
    fontFamily: "Inter",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  spinner: {
    margin: "1.5rem",
    color: "#3e55ab",
  },
  message: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#000000",
    opacity: 0.8
  },
});

function LoadingSpinner(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner} />
      <div className={classes.message}>{props.message}</div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

export default LoadingSpinner;
