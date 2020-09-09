import React from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ToolbarOptions from "./ToolbarOptions";
import Sidebar from "./Sidebar";
import RenderLayout from "./RenderLayout";

const useStyles = makeStyles(theme => ({
  Toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    color: grey[800],
    fontFamily: "Inter",
    fontSize: theme.typography.pxToRem(18),
  },
}));

function Landing(props) {
  const classes = useStyles();
  const page = props.page;
  const drawerWidth = "15rem"

  return (
    <React.Fragment>
      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar className={classes.Toolbar}>
          <ToolbarOptions />
        </Toolbar>
      </AppBar>
      <Sidebar
        width={drawerWidth}
        values={["Explore", "Storage", "Rules", "Monitoring"]}
      />
      <RenderLayout drawerWidth={drawerWidth} page={page} />
    </React.Fragment>
  );
}

export default Landing;
