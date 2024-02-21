
const { app, BrowserWindow, ipcMain, globalShortcut, dialog } = require("electron");
const path = require("path");
require("dotenv").config();

const APP_URL = process.env.APP_URL || "http://localhost:3000";
const isDev = process.env.NODE_ENV === "development";
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    sandbox: false,
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true
    },
  });

  mainWindow.loadURL(APP_URL);

  // Hide menu bar
  mainWindow.setMenu(null);

  // Open the DevTools when press control + I
  if(isDev) {
    mainWindow.webContents.toggleDevTools();
  }
  globalShortcut.register("Control+I", () => {
    mainWindow.webContents.toggleDevTools();
  });

  // Reload the app when press control + R
  globalShortcut.register("Control+R", () => {
    mainWindow.reload();
  });

  // Unregister the shortcut when the app is closed
  mainWindow.on("closed", () => {
    globalShortcut.unregisterAll();
    mainWindow = null;
  });

  mainWindow.webContents.on("did-navigate-in-page", (event, url) => {
    
  });

  mainWindow.webContents.on("dom-ready", () => {
    
  });

}

app.whenReady().then(() => createWindow());

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
