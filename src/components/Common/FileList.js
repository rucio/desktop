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
import {
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { lsFolder, currentUserMountPoint, parsePath } from "../Utils/Files";
import FileIcons from "./FileIcons";
import { useSelector, useDispatch } from "react-redux";
import { getFileMetadata } from "../Utils/Metadata";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80%",
    width: "100%",
    padding: theme.typography.pxToRem(12),
    margin: theme.typography.pxToRem(12),
  },
  container: {
    maxHeight: "100%",
  },
}));

// Add Objects to this array to add columns to FileList.
const columns = [
  { id: "name", label: "Name", minWidth: "6.25rem" },
  { id: "type", label: "Type", minWidth: "6.25rem" },
];

function FileList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cd = useSelector((state) => state);
  const [rows, setRows] = useState([]);
  const entrypoint = currentUserMountPoint();
  let key = 0;

  React.useEffect(() => {
    lsFolder(entrypoint).then((res) => setRows(res.data));
  }, [entrypoint]);

  /**
   * Renders the list of files/folders in the current directory by altering the state.
   * @param {String} folder folder name in the current directory
   */
  function renderFileList(folder) {
    return lsFolder(parsePath(cd.directory + "/" + folder))
      .then(dispatch({ type: "LOADING_TRUE" }))
      .then((res) => {
        if (res.status === 201) {
          getFileMetadata(cd.directory + "/" + folder)
            .then((res) => dispatch({ type: "GET_META", payload: res.data }))
            .then(dispatch({ type: "LOADING_FALSE" }));
        } else {
          setRows(res.data);
          dispatch({ type: "CD", folder: folder });
        }
      });
  }

  return (
    <Paper variant="outlined" id="file-list" className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={++key}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        onClick={() => renderFileList(row.name)}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1rem",
                            fontFamily: "Inter",
                          }}
                        >
                          <FileIcons type={row.type} rowValue={value} />
                          {value}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FileList;
