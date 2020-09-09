import React from "react";
import logoImage from "./ruciosq.png";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  logo: {
    position: "relative",
    padding: theme.typography.pxToRem(5),
    height: theme.typography.pxToRem(50),
    width: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

function Logo(props) {
  const classes = useStyles();
  return (
    <img
      src={logoImage}
      alt="logo"
      className={props.className || classes.logo}
    />
  );
}

export default Logo;
