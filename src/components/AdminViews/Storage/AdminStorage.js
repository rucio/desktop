import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core";
import { useSpring, animated } from "react-spring";
import RSECard from "./RSECard";
import { fetchRSEInfo } from "../../Utils/Storage";
import RSEInfo from "./RSEInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  list: {
    width: "40%",
    flex: "1 1 512px",
    height: `calc(100vh - 256px)`,
    overflow: "auto",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      width: "100%",
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
  const [index, setIndex] = useState(null);
  const [currentRSE, setCurrentRSE] = useState(null);
  const [rseInfo, setRSEInfo] = useState({});
  const [rseDetails, setRSEDetails] = useState({})
  const currentAccount = localStorage.getItem("CURR_ACCOUNT");
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    opacity: 1,
  });

  React.useEffect(() => {
    if (currentRSE !== null) {

      fetchRSEInfo(currentAccount, "rucio-server-x509", currentRSE).then(
        (rseInfo) => {
          setRSEInfo(rseInfo.data);
          console.log(rseInfo.data);
        }
      );
    }
  }, [currentAccount, currentRSE]);

  return (
    <div id="admin-storage-root" className={classes.root}>
      <animated.div id="anim-rse-list" className={classes.list} style={fade}>
        {props.list.map((details) => (
          <RSECard
            key={details.id}
            details={details}
            selected={index === details.id}
            setIndex={setIndex}
            setCurrentRSE={setCurrentRSE}
            setRSEDetails={setRSEDetails}
          />
        ))}
      </animated.div>
      <RSEInfo details={rseInfo} moreDetails={rseDetails}/>
    </div>
  );
}

AdminStorage.propTypes = {
  list: PropTypes.array
}

export default AdminStorage;
