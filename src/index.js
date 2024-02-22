
const { app, BrowserWindow, globalShortcut, ipcMain, desktopCapturer } = require("electron");
const path = require("path");
require("dotenv").config();

const APP_URL = process.env.APP_URL || "http://localhost:3000";
const isDev = process.env.NODE_ENV === "development";
let mainWindow;

let iconPath;
switch(process.platform) {
  case "darwin":
    iconPath = path.join(__dirname, "assets", "icon.icns");
    break;
  case "win32":
  case "win64":
    iconPath = path.join(__dirname, "assets", "icon.ico");
    break;
  default:
    iconPath = path.join(__dirname, "assets", "icon.png");
}

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
    icon: iconPath
  });
  mainWindow.loadURL(APP_URL);

  // Hide menu bar
  mainWindow.setMenu(null);

  if(isDev) mainWindow.webContents.toggleDevTools();
  globalShortcut.register("Control+I", () => mainWindow.webContents.toggleDevTools());
  globalShortcut.register("Control+R", () => mainWindow.reload());

  mainWindow.on("closed", () => {
    globalShortcut.unregisterAll();
    mainWindow = null;
  });
}

app.whenReady().then(() => createWindow());

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null)  createWindow();
});
ipcMain.handle('get-available-sources', async () => {
  const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
  return sources;
});