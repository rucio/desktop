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

const useStyles = makeStyles({
  root: {
    height: "80%",
    width: "100%",
    padding: 12,
    margin: 12,
  },
  container: {
    maxHeight: "100%",
  },
});

// Add Objects to this array to add columns to FileList.
const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "type", label: "Type", minWidth: 100 },
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
    return lsFolder(parsePath(cd.directory + "/" + folder)).then((res) => {
      if (res.status === 201) {
        getFileMetadata(cd.directory + "/" + folder).then((res) =>
          dispatch({ type: "GET_META", payload: res.data })
        );
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
                        <div style={{ display: "flex", alignItems: "center" }}>
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
