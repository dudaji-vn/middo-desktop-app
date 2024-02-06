import "dotenv/config";
import { app, BrowserWindow, globalShortcut } from "electron";

let mainWindow;
const APP_URL = process.env.APP_URL || "http://localhost:3000";
const isDev = process.env.NODE_ENV === "development";
function createWindow() {
  mainWindow = new BrowserWindow({
    // fullscreen: true,
    // frame: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(APP_URL);

  mainWindow.setMenu(null);

  if (isDev) {
    // Open the DevTools when press control + I
    globalShortcut.register("Control+I", () => {
      mainWindow.webContents.toggleDevTools();
    });

    // Unregister the shortcut when the app is closed
    mainWindow.on("closed", () => {
      globalShortcut.unregisterAll();
    });
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
