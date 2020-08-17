import React from "react";
import PropTypes from "prop-types";
import { Card, makeStyles, Box, AppBar, Tabs, Tab } from "@material-ui/core";
import NoRSEView from "./NoRSEView";

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
  panel: {
    display: "flex",
    flex: 1,
    height: "inherit",
    padding: 10,
    margin: 20,
    fontSize: "1rem",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  preInfo: {
    fontWeight: 600,
    color: "#354992",
    marginRight: 10,
  },
  info: {
    color: "#000000",
    fontWeight: 400,
    opacity: 0.8,
    display: "flex",
    alignItems: "start",
    marginBottom: "0.8rem",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.panel}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

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

  const processRegion = () => {
    const city = props.moreDetails.city ? props.moreDetails.city : "";
    const country = props.moreDetails.country_name
      ? props.moreDetails.country_name
      : "";
    const continent = props.moreDetails.continent
      ? props.moreDetails.continent
      : "";
    const regionCode = props.moreDetails.region_code
      ? `(${props.moreDetails.region_code})`
      : "";
    const regionStr = `${city} ${country} ${continent} ${regionCode}`;

    return regionStr.length > 3 ? regionStr : "Unknown";
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
        <TabPanel value={value} index={0}>
          <div id="type" className={classes.info}>
            <span className={classes.preInfo}>Type: </span>
            {props.details.rse_type}
          </div>
          <div id="volatile" className={classes.info}>
            <span className={classes.preInfo}>Region: </span>
            {processRegion()}
          </div>
          <div id="lfn2pfn" className={classes.info}>
            <span className={classes.preInfo}>LFN2PFN Algorithm: </span>
            {props.details.lfn2pfn_algorithm}
          </div>
          <div id="deterministic" className={classes.info}>
            <span className={classes.preInfo}>Deterministic: </span>
            {props.details.deterministic.toString()}
          </div>
          <div id="volatile" className={classes.info}>
            <span className={classes.preInfo}>Volatile: </span>
            {props.details.volatile.toString()}
          </div>
        </TabPanel>
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default RSEInfo;
