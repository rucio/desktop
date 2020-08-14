import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useSpring, animated } from "react-spring";
import RSECard from "./RSECard";
import { fetchRSEs } from "../../Utils/Storage";
import RSEInfo from "./RSEInfo";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minWidth: 512,
    paddingTop: 10,
    paddingBottom: 10,
  },
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  list: {
    width: "40%",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    },
  },
  hint: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.4,
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

function AdminStorage(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(null);
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    opacity: 1,
  });

  React.useEffect(() => {
    fetchRSEs("root", "rucio-server-x509").then((res) => {
      setList(res.data);
    });
  }, []);

  return (
    <div id="admin-storage-root" className={classes.root}>
      <div id="content" className={classes.content}>
        <animated.div className={classes.list} style={fade}>
          {list.map((details) => (
            <RSECard
              key={details.id}
              details={details}
              selected={index === details.id}
              setIndex={setIndex}
            />
          ))}
        </animated.div>
        <RSEInfo />
      </div>
    </div>
  );
}

export default AdminStorage;
