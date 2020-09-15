/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import axios from "axios";
import { getCurrentUser } from "./User";

/**
 * Returns a promise which resolves to an array of files in the given folder
 * @param {String} folder
 */
export function lsFolder(folder) {
  try {
    const response = axios.post("/files", {
      folder,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    return console.log(err);
  }
}

/**
 * Returns a String with current user's FUSE mount location.
 */
export function currentUserMountPoint() {
  const currentUser = getCurrentUser();
  try {
    const accounts = JSON.parse(localStorage.getItem("Accounts"));
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].account === currentUser.account) {
        return accounts[i].mountpoint;
      }
    }
  } catch (err) {
    localStorage.setItem("Accounts", JSON.stringify([]));
  }

  return "/";
}

/**
 * Takes string of current directory (cd) and returns an array with folder names as elements.
 * @param {String} cdString String from command `pwd` OR Present working directory string
 * @example
 * Input: "/home/user/Desktop"
 * Output: ["home", "user", "Desktop"]
 */
export function cdToArray(cdString) {
  return cdString.split("/").splice(1);
}

/**
 * Takes in an array and returns a string.
 * @param {Array} cdArray
 * @example
 * Input: ["home", "user", "Desktop"]
 * Output: "/home/user/Desktop"
 */
export function arrayToCd(cdArray) {
  let path = "";
  for (let i = 0; i < cdArray.length; i++) path = path + "/" + cdArray[i];

  return path;
}

/**
 * Returns a new path free of `..` and `.` folders
 * @param {String} path Current Path (state)
 */
export function parsePath(path) {
  const pathArray = cdToArray(path);
  const currentFolder = pathArray[pathArray.length - 1];
  switch (currentFolder) {
    case "..":
      return arrayToCd(pathArray.splice(0, pathArray.length - 2));
    case ".":
      return arrayToCd(pathArray.splice(0, pathArray.length - 1));
    default:
      return path;
  }
}
