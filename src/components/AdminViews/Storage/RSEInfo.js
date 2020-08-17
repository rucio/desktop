import React from "react";
import PropTypes from "prop-types";
import { Card, makeStyles, AppBar, Tabs, Tab } from "@material-ui/core";
import NoRSEView from "./NoRSEView";
import TabPanel from "./RSETabPanel";
import TabGeneral from "./TabGeneral";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 16.18,
    height: "72vh",
    margin: 10,
    position: "static",
    right: 20,
    display: "flex",
    flex: "1 1 60%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("lg")]: {
      height: "65vh",
      flex: "1 1 58%",
    },
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Cern",
    padding: 20,
    flex: "1 0 60%",
  },
  header: {
    padding: 40,
    width: "100%",
  },
  h1: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#000000",
    opacity: 0.8,
    marginBottom: 10,
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
    marginLeft: 20,
  },
  tab: {
    fontFamily: "Cern",
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
      <div className={classes.tabs}>
        <AppBar color="inherit" elevation={0} position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="rse-setting-tabs"
          >
            <Tab className={classes.tab} label="General" {...a11yProps(0)} />
            <Tab className={classes.tab} label="Protocols" {...a11yProps(1)} />
            <Tab className={classes.tab} label="Attributes" {...a11yProps(2)} />
            <Tab className={classes.tab} label="Usage" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabGeneral
          details={props.details}
          value={value}
          moreDetails={props.moreDetails}
        />
        <TabPanel value={value} index={1}>
          Protocols
        </TabPanel>
        <TabPanel value={value} index={2}>
          Attributes
        </TabPanel>
        <TabPanel value={value} index={3}>
          Usage
        </TabPanel>
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
