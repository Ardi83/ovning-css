const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  "mode": 'production',
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new MiniCssExtractPlugin({filename: "[name].[contentHash].css"}),  
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/template.html",
      favicon: './src/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeAttributeQuotes: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. Extract css into files
          'css-loader', // 2. Turns css into commonjs
          'sass-loader' // 1. Turn scss into css
        ],
      },
    ]
  }
});
