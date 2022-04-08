const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./main_[contenthash].js",
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ModuleFederationPlugin({
      name: "app02",
      remotes: {
        app01: "app01@[window.app01Url]/remoteEntry.js",
      },
    }),
    new ExternalRemotesPlugin(),
  ],
  devServer: {
    port: 8082,
  },
};
