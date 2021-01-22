const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  "mode": 'development',
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebPackPlugin({
      favicon: './src/favicon.ico',
      template: "./src/template.html",
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader', // 3. Inject styles into DOM
          'css-loader', // 2. Turns css into commonjs
          'sass-loader' // 1. Turn scss into css
        ],
      },
    ]
  }
});
