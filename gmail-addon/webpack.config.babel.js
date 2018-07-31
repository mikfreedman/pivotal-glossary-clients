import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin'
import fs from 'fs';
import WrapperPlugin from 'wrapper-webpack-plugin';
import template from 'lodash.template';

var pkg = require('./package.json');
pkg.currentDate = (new Date()).toISOString();

var headerDoc = fs.readFileSync('./header.js', 'utf8');

export default {
    entry: [path.join(__dirname, 'src/app.js')],
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {loader: 'babel-loader'},
        }],
    },
    output: {
        filename: 'Code.js',
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
        }),
        new CopyWebpackPlugin([
            {from: path.join(__dirname, 'src', '**', '*.html'), to: path.join(__dirname, 'dist'), flatten: true},
            {from: path.join(__dirname, 'src', '**', 'Wrapper.gs'), to: path.join(__dirname, 'dist', 'Wrapper.js'), flatten: true}
        ]),
        new WrapperPlugin({
            header: template(headerDoc)(pkg)
        })
    ]
};
