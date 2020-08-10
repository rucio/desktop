import React, { useState } from "react";
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { serverStatus } from "../Utils/Servers";
import { green, red } from "@material-ui/core/colors";
import SettingsIcon from "@material-ui/icons/Settings";
import ServerConfig from "./ServerConfig";
import { getConfig } from "../Utils/Config";
import AlertSnackbar from "../Utils/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Cern",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    width: "100%",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#000000",
    opacity: 0.8,
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  statusC: {
    fontSize: theme.typography.pxToRem(15),
    color: green[600],
    fontWeight: 500,
    opacity: 1,
  },
  statusD: {
    fontSize: theme.typography.pxToRem(15),
    color: red[600],
    fontWeight: 500,
    opacity: 1,
  },
}));

function ServerList() {
  const classes = useStyles();
  const serverDetails = serverStatus();
  const [config, setConfig] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [details, showDetails] = useState(false);
  const [server, setServer] = useState("");
  const [status, setStatus] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
    showDetails(!details);
  };

  React.useEffect(() => {
    if (server !== "")
      getConfig(server)
        .then((res) => {
          if (res.status === 200) setConfig(res.data);
        })
        .catch((err) => console.log(err));
  }, [server]);

  function handleAlertBar(status) {
    switch (status) {
      case 200:
        return (
          <AlertSnackbar
            severity="success"
            message={`Option Updated!`}
            onExited={() => setStatus(0)}
          />
        );
      case 401:
        return (
          <AlertSnackbar
            severity="warning"
            message={`Cannot Authenticate`}
            onExited={() => setStatus(0)}
          />
        );
      case 500:
        return (
          <AlertSnackbar
            severity="error"
            message={`Error updating value!`}
            onExited={() => setStatus(0)}
          />
        );
      default:
        return <div />;
    }
  }

  return (
    <div id="server-list" className={classes.root}>
      {serverDetails.map((item, index) => (
        <Accordion
          expanded={expanded === index}
          onChange={handleChange(index)}
          onClick={() => {
            setServer(item.server);
          }}
          key={item.server}
        >
          <AccordionSummary
            expandIcon={<SettingsIcon />}
            aria-controls={`${item.server}-content`}
            id={`${item.server}-header`}
          >
            <Typography className={classes.listItem}>{item.server}</Typography>
            <Typography
              className={
                item.status === "Connected" ? classes.statusC : classes.statusD
              }
            >
              {item.status}
            </Typography>
          </AccordionSummary>
          {config !== undefined ? (
            <ServerConfig
              config={config}
              setConfig={setConfig}
              server={item.server}
              setStatus={setStatus}
            />
          ) : (
            <Typography className={classes.listItem}>Loading...</Typography>
          )}
        </Accordion>
      ))}
      {handleAlertBar(status)}
    </div>
  );
}

export default ServerList;
