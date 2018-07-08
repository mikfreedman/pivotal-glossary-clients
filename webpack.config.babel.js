import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import CopyWebpackPlugin from 'copy-webpack-plugin'
import GenerateJsonPlugin from 'generate-json-webpack-plugin'

var pkg = require('./package.json');
var version = pkg.version
var manifest = require('./manifest.template.json');

if(process.env.CIRCLE_BUILD_NUM)
   version += '.' + process.env.CIRCLE_BUILD_NUM;

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
        Object.assign(manifest, { version: version }),
        2
      )
    ]
};
