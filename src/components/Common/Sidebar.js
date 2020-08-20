import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, Toolbar, List, ListItem } from "@material-ui/core";
import Logo from "../../layout/Logo";
import { Link } from "react-router-dom";
import SidebarIcons from "./SidebarIcons";

const useStyles = makeStyles({
  drawer: {
    width: (props) => props.drawerWidth,
    flexShrink: 0,
    backgroudColor: "#354992",
  },
  drawerPaper: {
    width: (props) => props.drawerWidth,
    backgroundColor: "#354992",
  },
  drawerContainer: {
    overflow: "auto",
  },
  logo: {
    height: 36,
    margin: 12,
    display: "block",
  },
  listItem: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    padding: "12px 36px",
    lineHeight: 1.5,
    letterSpacing: "0.001em",
    fontFamily: "Inter",
    fontWeight: 500,
    color: "#fffafa",
    fontSize: 16,
  },
});

/**
 * Renders a Sidebar in the app.
 * @param {any} props Takes in Props
 * @prop {number} width Defines the sidebar width.
 */
function Sidebar(props) {
  const classes = useStyles({ drawerWidth: props.width });

  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <React.Fragment>
          <Toolbar>
            <Logo className={classes.logo} />
          </Toolbar>
        </React.Fragment>
        <List>
          {props.values.map((text, index) => (
            <ListItem
              className={classes.listItem}
              button
              disabled={index > 1}
              key={text}
              component={AdapterLink}
              to={`/app/${text.toLowerCase()}`}
            >
              <SidebarIcons icon={text} />
              {text}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidebar;
