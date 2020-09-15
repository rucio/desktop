import React from "react";
import PropTypes from "prop-types";

/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

export default function ColoredLine(props) {
  return (
    <hr
      style={{
        color: props.color,
        backgroundColor: props.color,
        width: "100%",
        height: "0.0625rem",
        opacity: props.opacity || 1,
        borderStyle: "inset",
        borderWidth: 0,
        overflow: "hidden",
        margin: "1.25rem",
      }}
    />
  );
}

ColoredLine.propTypes = {
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number
}