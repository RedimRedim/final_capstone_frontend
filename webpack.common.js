const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/scripts/main.js",
    payroll: "./src/scripts/payroll.js",
    style: "./src/setup/style.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    hot: true,
    open: true,
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
    //new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: "main.html",
      template: path.resolve(__dirname, "src/templates/main.html"),
      chunks: ["main", "style"], // Include only the payroll bundle
    }),

    new HtmlWebpackPlugin({
      filename: "payroll.html",
      template: path.resolve(__dirname, "src/templates/payroll.html"),
      chunks: ["payroll", "style"], // Include only the payroll bundle
    }),

    // new HtmlWebpackPlugin({
    //   filename: "payroll.html",
    //   template: path.resolve(__dirname, "src/templates/payroll.html"),
    // }),
  ],
};
