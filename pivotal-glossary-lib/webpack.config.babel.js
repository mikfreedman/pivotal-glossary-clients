import path from 'path';

export default {
    entry: {
        pivotal_glossary_lib: path.join(__dirname, 'src/pivotal_glossary_lib.js'),
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {loader: 'babel-loader'},
        }
        ],
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
    plugins: []
};
