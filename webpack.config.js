const path = require("path");
const rootDir = path.join(__dirname, "");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: false,

  entry: {
    ["serviceWorker"]: path.join(rootDir, "src/js", "serviceWorker"),
    ["googleVoice"]: path.join(rootDir, "src/js", "googleVoice"),
    ["textNow"]: path.join(rootDir, "src/js", "textNow"),
    ["impact"]: path.join(rootDir, "src/js", "impact"),
    ["popup"]: path.join(rootDir, "src/js", "popup"),
  },

  output: {
    filename: "js/[name].js",
    path: path.join(rootDir, "build"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/popup.html", to: "" },
        { from: "src/manifest.json", to: "" },
        { from: "src/images", to: "images" },
      ],
    }),
  ],

  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,
  },
};
