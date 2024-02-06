import "dotenv/config";
import { app, BrowserWindow, globalShortcut, session } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_URL = process.env.APP_URL || "http://localhost:3000";
const isDev = process.env.NODE_ENV === "development";
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    // fullscreen: true,
    // frame: true,
    experimentalFeatures: true, 
    icon: path.join(__dirname, "assets", "icon-linux.png"),
    nodeIntegration: true,
    contextIsolation: false,
    sandbox: true, // Enable sandbox for additional security
    enableRemoteModule: true,
    webSecurity: true, // Enable web security
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["self"],
        scriptSrc: ["self"],
      },
    },
  });

  mainWindow.loadURL(APP_URL);

  // Hide menu bar
  mainWindow.setMenu(null);

  if (isDev) {
    // Open the DevTools when press control + I
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
    });
  }

  // Handle media permissions directly on webContents
//   mainWindow.webContents.on("select-media-started", (event, request) => {
//     // Allow access to media devices
//     event.preventDefault();
//     request.allow();
//   });
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  //   session.defaultSession.setPermissionRequestHandler(
  //     (webContents, permission, callback) => {
  //       if (permission === "media") {
  //         callback(true);
  //       } else {
  //         callback(false);
  //       }
  //     }
  //   );
  createWindow();

});

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
