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
import { getRSEChangelog, updateRSESettings } from "../../Utils/Storage";
import RevertChangeDialog from "./RevertChangeDialog";
import { useDispatch } from "react-redux";
import AlertSnackbar from "../../Utils/Snackbar";

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
  const dispatch = useDispatch();

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

  const handleClick = (index) => {
    setOpen(true);
    setCurrentLog(changelog[index]);
  };

  const handleRollback = async () => {
    dispatch({ type: "LOADING_TRUE" });
    const currentAccount = localStorage.getItem("CURR_ACCOUNT");

    switch (currentLog.component) {
      case "settings":
        await updateRSESettings(
          currentAccount,
          "rucio-server-x509",
          currentLog.rse,
          props.id,
          currentLog.initial,
          currentLog.changed
        )
          .then((res) => setStatus(res.status))
          .then(dispatch({ type: "LOADING_FALSE" }))
          .then(setOpen(false))
          .then(() => dispatch({ type: "SHOW_SNACKBAR" }));
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
