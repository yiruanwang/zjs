const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/zjs.min.js',
        path: path.resolve(__dirname, 'dist')
    }, plugins: [
        new UglifyJsPlugin(),
        new CopyWebpackPlugin(
            [
                {from: 'favicon.ico', to: 'favicon.ico'},
                // {from: 'example/index.html', to: 'index.html'},
                {from: 'static', to: 'static'},
            ],
            {ignore: [], copyUnmodified: true}
        ),
        new HtmlWebpackPlugin({
            minify:{
                collapseWhitespace:false //折叠空白区域 也就是压缩代码
            },
            hash:true,
            inject:'head',
            title:'播放器',
            template: './example/index.html', //模板地址
            filename: 'index.html',
            //template: 'm_vol.html'
        }),
        gitRevisionPlugin,
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'QSJS-VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        })
    ], module: {
        rules: [
            //暴露$和jQuery到全局
            {
                test: require.resolve('jquery'), //require.resolve 用来获取模块的绝对路径
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
 devServer: {
        port: 7000
    },
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 300000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
    }
};
