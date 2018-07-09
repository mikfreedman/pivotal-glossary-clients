import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import GenerateJsonPlugin from 'generate-json-webpack-plugin';
import ZipPlugin from 'zip-webpack-plugin';
import {Release} from './scripts/release';

var release = new Release(require('./package.json'));
var manifest = require('./manifest.template.json');

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
        path: path.join(__dirname, 'build'),
    },
    resolve: {
      extensions: ['.js'],
        modules: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules'),
        ],
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'icons', to: 'icons' },
        { from: '_locales/**/*', flatten: false }
      ]),
      new GenerateJsonPlugin(
        'manifest.json',
        Object.assign(manifest, { version: release.version }),
        2
      ),
      new ZipPlugin({
        path: '../dist',
        filename: release.filename
      })
    ]
};
