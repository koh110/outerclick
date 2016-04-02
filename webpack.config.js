'use strict';

const APP_ROOT = __dirname;

module.exports = {
  entry: `${APP_ROOT}/src/entry.js`,
  devtool: '#source-map',
  output: {
    path: `${APP_ROOT}/dist`,
    filename: 'outerclick.js',
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
  }
};
