/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

const fs = require("fs");

/**
 * Returns the list of files/folders inside a Directory.
 * @param {String} folder Path to file
 * @param {String} mountpoint Mountpoint for Rucio FUSE system
 */
function getFiles(folder, mountpoint = "/ruciofs") {
  let list = [{ name: "." }, { name: ".." }];
  const files = [];
  const folders = [];

  if (fs.statSync(folder).isFile()) return "FILE";
  if (folder === mountpoint) list = [];

  try {
    fs.readdirSync(folder).forEach((file) => {
      const statsObj = fs.statSync(folder + "/" + file);
      statsObj.isFile()
        ? files.push({ name: file, type: "FILE" })
        : folders.push({ name: file, type: "FOLDER" });
    });
  } catch (err) {
    console.log(`[INFO] Folder not found at ${folder}`);
    return null;
  }
  console.log(`[INFO] Files retrieved from ${folder}`);

  list = list.concat(files, folders);
  return list;
}

exports.getFiles = getFiles;
