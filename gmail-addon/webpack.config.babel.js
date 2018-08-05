
var path = require('path');
var webpack = require('webpack');
var GenerateJsonPlugin = require('generate-json-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var fs = require('fs');
var WrapperPlugin = require('wrapper-webpack-plugin');
var template = require('lodash.template');

var manifest = require('./appscript.template.json');
var pkg = require('./package.json');
pkg.currentDate = (new Date()).toISOString();

var headerDoc = fs.readFileSync('./header.js', 'utf8');

module.exports =  {
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
        new CopyWebpackPlugin([
            {from: path.join(__dirname, 'src', '**', '*.html'), to: path.join(__dirname, 'dist'), flatten: true},
            {from: path.join(__dirname, 'src', '**', 'Wrapper.gs'), to: path.join(__dirname, 'dist', 'Wrapper.js'), flatten: true}
        ]),
        new WrapperPlugin({
            header: template(headerDoc)(pkg)
        }),
        new GenerateJsonPlugin(
            'appsscript.json',
            manifest,
            2
        ),

    ]
};
