'use strict';

const APP_ROOT = __dirname;
const webpack = require('webpack');

module.exports = {
  entry: {
    'outerclick': `${APP_ROOT}/src/entry.js`,
    'outerclick.min': `${APP_ROOT}/src/entry.js`
  },
  devtool: '#source-map',
  output: {
    path: `${APP_ROOT}/dist`,
    filename: '[name].js',
    library: 'outerclick',
    libraryTarget: 'umd'
  },
  resolve: {
    root: `${APP_ROOT}/src`,
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
