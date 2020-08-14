import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 16.18,
    height: "80vh",
    margin: 10,
    position: "fixed",
    right: 20,
    [theme.breakpoints.down("md")]: {
      display: "none"
    },
    [theme.breakpoints.down("lg")]: {
      width: "35%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
    [theme.breakpoints.down("xl")]: {
      width: "45%",
    },
    [theme.breakpoints.up("xl")]: {
      width: "50%"
    },
  },
}));

function RSEInfo(props) {
  const classes = useStyles();
  return (
    <Card elevation={5} className={classes.root}>
      <CardContent>Info Here</CardContent>
    </Card>
  );
}

RSEInfo.propTypes = {
  details: PropTypes.object,
};

export default RSEInfo;
