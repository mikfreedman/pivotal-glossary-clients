import path from 'path';
import webpack from 'webpack';
import fs from 'fs';

var pkg = require('./package.json');
pkg.currentDate = (new Date()).toISOString();

export default {
  entry: {
    background: path.join(__dirname, 'src/background.js'),
      content_script: path.join(__dirname, 'src/content_script.js')
  },
    module: {
      rules: [{
        exclude: /node_modules/,
        test: /\.js$/,
        use: {loader: 'babel-loader'},
      }],
    },
    output: {
      filename: '[name].js',
        libraryTarget: 'this',
        path: path.join(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.js'],
        modules: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules'),
        ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        _: 'underscore'
      })
    ]
};
