const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/zjs.min.js',
        path: path.resolve(__dirname, 'dist')
    }, plugins: [
        new UglifyJsPlugin(),
    ], devServer: {
        port: 7000
    }
};
