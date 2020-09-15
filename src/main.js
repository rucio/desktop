/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path')

let window;

app.on("ready", () => {
  createWindow();
});

const createWindow = () => {
  window = new BrowserWindow({
    minWidth: 800,
    minHeight: 400,
    fullscreenable: true,
    resizable: true,
    transparent: false,
    skipTaskbar: true,
    scrollable: false,
    backgroundColor: "#fffafa",
    useContentSize: true,
    webPreferences: {
      backgroundThrottling: false,
    },
    icon: path.join(__dirname, 'layout/ruciosq.png')
  });

  window.loadURL("http://localhost:3005/#/app/explore");
  window.setMenuBarVisibility(false)
};

ipcMain.on("show-window", () => {
  window.show();
});
