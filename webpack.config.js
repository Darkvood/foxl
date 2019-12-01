const webpack = require("webpack");
const resolve = require("path").resolve;

const mode = process.env.NODE_ENV;

module.exports = {
  mode,
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
      FOXL_VERSION: "1.2"
    })
  ]
};
