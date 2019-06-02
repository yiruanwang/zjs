const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/zjs.min.js',
        path: path.resolve(__dirname, 'dist')
    }, plugins: [
        // new UglifyJsPlugin(),
        new CopyWebpackPlugin(
            [
                {from: 'favicon.ico', to: 'favicon.ico'},
                {from: 'example/index.html', to: 'index.html'},
                {from: 'static', to: 'static'},
            ],
            {ignore: [], copyUnmodified: true}
        ),
    ], devServer: {
        port: 7000
    },
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 300000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
    }
};
