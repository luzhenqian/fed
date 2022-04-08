const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
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
      name: "app01",
      filename: "remoteEntry.js",
      exposes: {
        "./Header": "./src/header",
      },
    }),
  ],
  devServer: {
    port: 8081,
  },
};
