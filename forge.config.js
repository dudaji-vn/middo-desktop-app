const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require("path");

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(process.cwd(), "src", "assets"),
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: path.join(process.cwd(), "src", "assets", "icon.png"),
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://url/to/icon.ico',
        setupIcon: path.join(process.cwd(), "src", "assets", "icon.ico"),
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: path.join(process.cwd(), "src", "assets", "icon.png"),
        }
      }
    },
    {
      // Path to the icon to use for the app in the DMG window
      name: '@electron-forge/maker-dmg',
      config: {
        icon: path.join(process.cwd(), "src", "assets", "icon.icns"),
      }
    },
    {
      name: '@electron-forge/maker-wix',
      config: {
        icon: path.join(process.cwd(), "src", "assets", "icon.ico"),
      }
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ]
};
