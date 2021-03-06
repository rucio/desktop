/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import React from "react";
import PropTypes from "prop-types";
import { Card, makeStyles, AppBar, Tabs, Tab } from "@material-ui/core";
import NoRSEView from "./NoRSEView";
import TabPanel from "./RSETabPanel";
import TabGeneral from "./TabGeneral";
import TabProtocol from "./TabProtocol";
import TabHistory from "./TabHistory";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.typography.pxToRem(16.18),
    height: "72vh",
    margin: theme.typography.pxToRem(10),
    position: "static",
    right: theme.typography.pxToRem(20),
    display: "flex",
    flex: "1 1 56%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("lg")]: {
      height: "68vh",
      flex: "1 1 58%",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Inter",
    padding: theme.typography.pxToRem(20),
    flex: "1 0 60%",
  },
  header: {
    padding: theme.typography.pxToRem(40),
    width: "100%",
  },
  h1: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#000000",
    opacity: 0.8,
    marginBottom: theme.typography.pxToRem(10),
  },
  h2: {
    fontSize: "1.0rem",
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
  },
  tabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginLeft: theme.typography.pxToRem(20),
    height: "inherit",
  },
  tab: {
    fontFamily: "Inter",
    fontWeight: 500,
  },
}));

function a11yProps(index) {
  return {
    id: `rse-tab-${index}`,
    "aria-controls": `rse-tabpanel-${index}`,
  };
}

function RSEInfo(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function SimpleTabs() {
    return (
      <div id="simple-rse-tabs" className={classes.tabs}>
        <AppBar color="inherit" id="app-bar" elevation={0} position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="rse-setting-tabs"
          >
            <Tab className={classes.tab} label="General" {...a11yProps(0)} />
            <Tab className={classes.tab} label="Protocols" {...a11yProps(1)} />
            <Tab className={classes.tab} label="Attributes" {...a11yProps(2)} />
            <Tab className={classes.tab} label="Usage" {...a11yProps(3)} />
            <Tab className={classes.tab} label="History" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabGeneral
          details={props.details}
          value={value}
          moreDetails={props.moreDetails}
        />
        <TabProtocol
          protocols={props.details.protocols}
          rse={props.details.rse}
          id={props.details.id}
          value={value}
        />
        <TabPanel value={value} index={2}>
          Attributes
        </TabPanel>
        <TabPanel value={value} index={3}>
          Usage
        </TabPanel>
        <TabHistory value={value} id={props.details.id} />
      </div>
    );
  }

  const infoHeader = () => {
    return (
      <div id="info-header" className={classes.header}>
        <div id="rse-name" className={classes.h1}>
          {props.details.rse}
        </div>
        <div id="rse-id" className={classes.h2}>
          {props.details.id}
        </div>
      </div>
    );
  };

  const infoView = () => {
    return (
      <React.Fragment>
        {infoHeader()}
        {SimpleTabs()}
      </React.Fragment>
    );
  };

  return (
    <Card elevation={6} className={classes.root}>
      <div className={classes.content}>
        {props.details.rse ? infoView() : <NoRSEView />}
      </div>
    </Card>
  );
}

RSEInfo.propTypes = {
  details: PropTypes.object,
  moreDetails: PropTypes.object,
};

export default RSEInfo;
