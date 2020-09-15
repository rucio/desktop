/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import TabPanel from "./RSETabPanel";
import {
  getRSEChangelog,
  updateRSESettings,
  updateProtocol,
} from "../../Utils/Storage";
import RevertChangeDialog from "./RevertChangeDialog";
import { useDispatch, useSelector } from "react-redux";
import AlertSnackbar from "../../Utils/Snackbar";
import { getCurrentServer } from "../../Utils/Servers";

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: "Inter",
    fontSize: theme.typography.pxToRem(16),
    opacity: 0.5,
    fontWeight: 500,
  },
  column: {
    minWidth: theme.typography.pxToRem(192),
    fontFamily: "Inter",
    fontSize: theme.typography.pxToRem(16),
    opacity: 0.8,
  },
  cell: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    fontFamily: "Inter",
  },
}));

// Add Objects to this array to add columns to FileList.
const columns = [
  { id: "timestamp", label: "Time" },
  { id: "version", label: "Update ID" },
  { id: "component", label: "Component" },
];

function TabHistory(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentLog, setCurrentLog] = useState(null);
  const [changelog, setChangelog] = useState([]);
  const [status, setStatus] = React.useState(0);
  const currentAccount = localStorage.getItem("CURR_ACCOUNT");
  const currentServer = getCurrentServer();
  const dispatch = useDispatch();
  const fetch = useSelector((state) => state.fetch);

  React.useEffect(() => {
    setCurrentLog(null);
  }, [props.id]);

  React.useEffect(() => {
    getRSEChangelog(props.id)
      .then((logs) => {
        setChangelog(logs.data);
      })
      .catch((err) => console.log(err));
  }, [props.id]);

  React.useEffect(() => {
    if (fetch) {
      getRSEChangelog(props.id)
        .then((logs) => {
          setChangelog(logs.data);
        })
        .catch((err) => console.log(err));
    }

    return () => dispatch({ type: "CANCEL_FETCH" });
  }, [dispatch, props.id, fetch]);

  const handleClick = (index) => {
    setOpen(true);
    setCurrentLog(changelog[index]);
  };

  const handleRollback = async () => {
    dispatch({ type: "LOADING_TRUE" });

    switch (currentLog.component) {
      case "settings":
        await updateRSESettings(
          currentAccount,
          currentServer,
          currentLog.rse,
          props.id,
          currentLog.initial,
          currentLog.changed
        )
          .then((res) => setStatus(res.status))
          .then(dispatch({ type: "LOADING_FALSE" }))
          .then(setOpen(false))
          .then(() => dispatch({ type: "SHOW_SNACKBAR" }))
          .then(() => dispatch({ type: "TRIGGER_FETCH" }));
        break;
      case "protocol":
        await updateProtocol(
          currentAccount,
          currentServer,
          currentLog.rse,
          props.id,
          currentLog.changed.scheme,
          currentLog.changed.hostname,
          currentLog.changed.port,
          currentLog.initial,
          currentLog.changed
        )
          .then((res) => setStatus(res.status))
          .then(dispatch({ type: "LOADING_FALSE" }))
          .then(setOpen(false))
          .then(() => dispatch({ type: "SHOW_SNACKBAR" }))
          .then(() => dispatch({ type: "TRIGGER_FETCH" }))
          .catch((err) => console.log(err));
        break;
      default:
        console.log("No Such Component");
    }
  };

  function handleAlertBar(status) {
    switch (status) {
      case 200:
        return (
          <AlertSnackbar
            severity="success"
            message={`RSE Settings Updated!`}
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
            message={`Error updating values!`}
            onExited={() => setStatus(0)}
          />
        );
      default:
        return <div />;
    }
  }

  return (
    <React.Fragment>
      <TabPanel value={props.value} index={4}>
        <div className={classes.text}>
          Select an item to see update history. Review before rolling back
          changes{" "}
        </div>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className={classes.column}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {changelog.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.version}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => handleClick(index)}
                        >
                          <div className={classes.cell}>{value}</div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      {currentLog !== null ? (
        <RevertChangeDialog
          key={currentLog.version}
          changelog={currentLog}
          open={open}
          handleConfirm={() => handleRollback()}
          handleClose={() => setOpen(false)}
        />
      ) : null}
      {handleAlertBar(status)}
    </React.Fragment>
  );
}

TabHistory.propTypes = {
  value: PropTypes.number.isRequired,
  id: PropTypes.string,
};

export default TabHistory;
