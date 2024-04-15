module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        cwd: "babelrc",
        root: ["./"],
        extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
        alias: {
          "@assets": ["./assets"],
          "@": ["./src/"],
          "@navigators": ["./src/navigators"],
          "@screens": ["./src/screens"],
          "@components": ["./src/components"],
          "@hooks": ["./src/hooks"],
          "@utils": ["./src/utils"],
          "@services": ["./src/services"],
          "@types": ["./src/types"],
          "@constants": ["./src/constants"],
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
