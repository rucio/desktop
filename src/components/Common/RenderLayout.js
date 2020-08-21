import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import { makeStyles } from "@material-ui/core";
import Explore from "./Explore";
import { Redirect } from "react-router-dom";
import Settings from "./Settings";
import Account from "./Account";
import Storage from "./Storage";

const useStyles = makeStyles((theme) => ({
  content: {
    width: (props) => `calc(100% - ${props.drawerWidth})`,
    marginLeft: (props) => props.drawerWidth,
    height: `calc(100% - 6rem)`,
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: "Inter",
  },
  pageTitle: {
    textAlign: "left",
    fontWeight: 300,
    fontSize: theme.typography.pxToRem(48),
    opacity: 0.85,
    width: "inherit",
    color: "#3e55ab",
  },
}));

function RenderLayout(props) {
  const classes = useStyles({ drawerWidth: props.drawerWidth });
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    opacity: 1,
  });

  function renderSwitch(page) {
    switch (page) {
      case "Explore":
        return <Explore />;
      case "Storage":
        return <Storage />;
      case "Rules":
        return <div />;
      case "Monitoring":
        return <div />;
      case "Settings":
        return <Settings />;
      case "Account":
        return <Account />;
      default:
        return <Redirect to="/" />;
    }
  }

  return (
    <React.Fragment>
      <animated.div className={classes.content} style={fade}>
        <div id="page-title" className={classes.pageTitle}>
          {props.page}
        </div>
        {renderSwitch(props.page)}
      </animated.div>
    </React.Fragment>
  );
}

RenderLayout.propTypes = {
  page: PropTypes.string,
  drawerWidth: PropTypes.number,
};

export default RenderLayout;
