import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useSpring, animated } from "react-spring";
import RSECard from "./RSECard";
import { fetchRSEs } from "../../Utils/Storage";

const useStyles = makeStyles({
  root: {
    minWidth: "40%",
    maxWidth: "50%",
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Cern",
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.6,
    paddingTop: 20,
    paddingBottom: 30,
  },
  hint: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.4,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

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
      <div id="title" className={classes.title}>
        Rucio Storage Elements
      </div>
      <animated.div style={fade}>
        {list.map((details) => (
          <RSECard
            key={details.id}
            details={details}
            selected={index === details.id}
            setIndex={setIndex}
          />
        ))}
      </animated.div>
    </div>
  );
}

export default AdminStorage;
