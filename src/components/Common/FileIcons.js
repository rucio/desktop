import React from "react";
import FolderIcon from "@material-ui/icons/Folder";
import DescriptionIcon from "@material-ui/icons/Description";
import { makeStyles } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    fontSize: 24,
    color: lightBlue[400],
    padding: 5
  },
});

function FileIcons(props) {
  const classes = useStyles();
  if(props.rowValue === "FILE" || props.rowValue === "FOLDER" || props.rowValue === undefined) return null;

  switch (props.type) {
    case "FILE":
      return <DescriptionIcon className={classes.root} />;
    case "FOLDER":
      return <FolderIcon className={classes.root} />;
    default:
      return null
  }
}

export default FileIcons;
