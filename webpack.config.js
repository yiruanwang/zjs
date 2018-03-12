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
    ]
};










// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var webpack = require('webpack');
// var path = require('path');

// var config = {
//     entry: "./src/index.js",
//     output: {
//         // path: __dirname + "/dist/js",
//         path: path.join(__dirname, './dist/js'),
//         filename: 'zjs.min.js'
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 loader: 'babel',
//                 exclude: /node_modules/
//             },
//         ], plugins: [
//             new webpack.BannerPlugin('yiruan.wang')
//         ]
//     }


// };

// module.exports = config;