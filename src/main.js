const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path')

let window;

app.on("ready", () => {
  createWindow();
});

const createWindow = () => {
  window = new BrowserWindow({
    width: 1024,
    height: 768,
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

  window.loadURL("http://localhost:3005");
  window.setMenuBarVisibility(false)
};

ipcMain.on("show-window", () => {
  window.show();
});
