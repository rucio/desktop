import React, { useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import AdminStorage from "../AdminViews/Storage/AdminStorage";
import UserStorage from "../UserViews/Storage/UserStorage";
import { grey } from "@material-ui/core/colors";
import { fetchRSEs } from "../Utils/Storage";
import { getCurrentServer } from "../Utils/Servers";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(100% - 3rem)",
    textAlign: "left",
    fontFamily: "Inter",
  },
  title: {
    fontSize: theme.typography.pxToRem(32),
    fontWeight: 500,
    color: grey[800],
    paddingTop: theme.typography.pxToRem(20),
  },
  hint: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
    paddingTop: theme.typography.pxToRem(20),
  },
  info: {
    fontSize: theme.typography.pxToRem(14),
    color: "#000000",
    opacity: 0.8,
    paddingRight: theme.typography.pxToRem(10),
    paddingTop: theme.typography.pxToRem(10),
  },
  panel: {
    padding: theme.typography.pxToRem(20),
    marginTop: theme.typography.pxToRem(20),
    width: "32%",
  },
}));

function Storage() {
  const classes = useStyles();
  const view = localStorage.getItem("viewContext");
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currentAccount = localStorage.getItem("CURR_ACCOUNT");
  const currentServer = getCurrentServer();
  const dispatch = useDispatch();
  const fetch = useSelector((state) => state.fetch);

  React.useEffect(() => {
    fetchRSEs(currentAccount, currentServer).then((res) => {
      setList(res.data);
    });
  }, [currentAccount, currentServer]);

  React.useEffect(() => {
    if (fetch === 1) {
      fetchRSEs(currentAccount, currentServer).then((res) => {
        setList(res.data);
      });
    }

    return () => dispatch({type: "CANCEL_FETCH"})
  }, [dispatch, currentAccount, currentServer, fetch]);

  React.useEffect(() => {
    const newList = list.filter((item) =>
      item.rse.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(newList);
  }, [list, searchTerm]);

  return (
    <div className={classes.root}>
      <div id="rse-panel" className={classes.panel}>
        <TextField
          color="primary"
          variant="outlined"
          size="small"
          fullWidth
          placeholder={"Search RSEs"}
          id="rse-search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {view === "admin" ? (
        <AdminStorage list={filteredList} searchPhrase={searchTerm} />
      ) : (
        <UserStorage />
      )}
    </div>
  );
}

export default Storage;
