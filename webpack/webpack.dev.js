const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const WebExtPlugin = require("web-ext-plugin");

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  plugins: [
    new WebExtPlugin({
      sourceDir: "../../dist",
      target: "chromium",
      startUrl: "https://nk.pl",
      browserConsole: true,
      chromiumProfile: 'D://repositories/nk-exporter/chromium-test-profile',
      profileCreateIfMissing: true,
      keepProfileChanges: true
    }),
  ],
});
