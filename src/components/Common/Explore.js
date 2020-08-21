import React from "react";
import { Breadcrumbs, makeStyles } from "@material-ui/core";
import FileList from "./FileList";
import DIDMeta from "./DIDMeta";
import { cdToArray } from "../Utils/Files";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  Breadcrumbs: {
    paddingTop: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(20),
  },
  content: {
    width: `calc(100% - 3rem)`,
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: theme.typography.pxToRem(2),
    margin: theme.typography.pxToRem(1),
  },
}));

function Explore() {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const metadataObj = state.metadata
  let key = 0;

  // TODO:
  // Add Empty Mountpoint Screen
  // Add No Metadata View
  // Show Container/Dataset Metadata on Click, Second Click opens folder.

  // FIXME:
  // Clear File Metadata when changing directory
  
  return (
    <React.Fragment>
      <Breadcrumbs
        className={classes.Breadcrumbs}
        maxItems={3}
        aria-label="files"
      >
        {cdToArray(state.directory).map((item) => (
          <div key={++key}>{item}</div>
        ))}
      </Breadcrumbs>
      <div id="explore-content" className={classes.content}>
        <FileList />
        <DIDMeta
          icon={metadataObj.type}
          did={metadataObj.name}
          meta={metadataObj}
        />
      </div>
    </React.Fragment>
  );
}

export default Explore;
