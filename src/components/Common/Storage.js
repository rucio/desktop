import React, { useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import AdminStorage from "../AdminViews/Storage/AdminStorage";
import UserStorage from "../UserViews/Storage/UserStorage";
import { grey } from "@material-ui/core/colors";
import { fetchRSEs } from "../Utils/Storage";

const useStyles = makeStyles({
  root: {
    width: "calc(100% - 48px)",
    textAlign: "left",
    fontFamily: "Inter",
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    color: grey[800],
    paddingTop: 20,
  },
  hint: {
    fontSize: 16,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
    paddingTop: 20,
  },
  info: {
    fontSize: 14,
    color: "#000000",
    opacity: 0.8,
    paddingRight: 10,
    paddingTop: 10,
  },
  panel: {
    padding: 20,
    marginTop: 20,
    width: "32%",
  },
});

function Storage() {
  const classes = useStyles();
  const view = localStorage.getItem("viewContext");
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currentAccount = localStorage.getItem("CURR_ACCOUNT");

  React.useEffect(() => {
    fetchRSEs(currentAccount, "rucio-server-x509").then((res) => {
      setList(res.data);
    });
  }, [currentAccount]);

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
        <AdminStorage list={filteredList} searchPhrase={searchTerm}/>
      ) : (
        <UserStorage />
      )}
    </div>
  );
}

export default Storage;
