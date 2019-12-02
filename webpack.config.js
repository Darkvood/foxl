const webpack = require("webpack");
const merge = require("webpack-merge");
const NodemonPlugin = require("nodemon-webpack-plugin");

const pkg = require("./package.json");
const resolve = require("path").resolve;

const mode = process.env.NODE_ENV;

let config = {
  mode,
  target: "node",
  entry: resolve(__dirname, "src/index.ts"),
  output: {
    path: resolve(__dirname, "dist"),
    filename: "main.js",
    library: "foxl-db",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".ts"]
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      FOXL_VERSION: `'${pkg.version}'`
    })
  ]
};

if (mode === "development") {
  config = merge.strategy({ entry: "replace", plugins: "append" })(config, {
    entry: resolve(__dirname, "dev/index.ts"),
    plugins: [new NodemonPlugin()]
  });
}

module.exports = config;
