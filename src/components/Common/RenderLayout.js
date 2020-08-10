import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import Explore from "./Explore";
import { Redirect } from "react-router-dom";
import Settings from "./Settings";
import Account from "./Account";

const useStyles = makeStyles((theme) => ({
  content: {
    width: (props) => `calc(100% - ${props.drawerWidth}px)`,
    marginLeft: (props) => props.drawerWidth,
    height: `calc(100% - 96px)`,
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: "Cern",
  },
  pageTitle: {
    textAlign: "left",
    fontWeight: 200,
    fontSize: 48,
    opacity: 0.85,
    width: "inherit",
    color: "#3e55ab",
  },
}));

function RenderLayout(props) {
  const classes = useStyles({ drawerWidth: props.drawerWidth });

  function renderSwitch(page) {
    switch (page) {
      case "Explore":
        return <Explore />;
      case "Storage":
        return <div />;
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
      <div className={classes.content}>
        <div id="page-title" className={classes.pageTitle}>
          {props.page}
        </div>
        {renderSwitch(props.page)}
      </div>
    </React.Fragment>
  );
}

RenderLayout.propTypes = {
  page: PropTypes.string,
  drawerWidth: PropTypes.number
}

export default RenderLayout;
