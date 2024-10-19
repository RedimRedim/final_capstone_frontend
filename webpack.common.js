const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/views/main.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: "main.html",
      template: path.resolve(__dirname, "./src/templates/main.html"),
      chunks: ["main"], // Include only the payroll bundle
    }),

    // new HtmlWebpackPlugin({
    //   filename: "payroll.html",
    //   template: path.resolve(__dirname, "src/templates/payroll.html"),
    // }),
  ],
};
