/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import { currentUserMountPoint, parsePath } from "../Utils/Files";

const currentDirectory = currentUserMountPoint();

function directoryReducer(state = currentDirectory, action) {
  switch (action.type) {
    case "CD":
      const newDir = parsePath(state) + "/" + action.folder;
      return parsePath(newDir);
    default:
      return state;
  }
}

export default directoryReducer;
