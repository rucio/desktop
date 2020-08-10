import React from "react";
import FolderIcon from "@material-ui/icons/Folder";
import DescriptionIcon from "@material-ui/icons/Description";
import { makeStyles } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    height: 80,
    width: "auto",
    padding: 20,
    color: lightBlue[400],
  },
});

function MetaIcons(props) {
  const classes = useStyles();

  switch (props.icon) {
    case "FILE":
      return <DescriptionIcon className={classes.root} />;
    case "CONTAINER":
      return <FolderIcon className={classes.root} />;
    case "DATASET":
      return <FolderIcon className={classes.root} />;
    default:
      return <div/>;
  }
}

export default MetaIcons;
