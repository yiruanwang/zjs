const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
    mode: "production",
    entry: ['@babel/polyfill', './src/index.js'],
    // entry: './src/index.js',
    output: {
        filename: 'js/zjs.min.js',
        path: path.resolve(__dirname, 'dist')
    }, plugins: [
        new UglifyJsPlugin(),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         ie8: true,
        //         output: {
        //             comments: false,
        //             beautify: false
        //         },
        //         warnings: false
        //     }
        // }),
        new CopyWebpackPlugin(
            [
                {from: 'favicon.ico', to: 'favicon.ico'},
                 {from: 'static/README.md', to: 'README.md'},
                {from: 'static', to: 'static'},
            ],
            {ignore: [], copyUnmodified: true}
        ),
        new HtmlWebpackPlugin({
            minify:{
                collapseWhitespace:true //折叠空白区域 也就是压缩代码
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
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },{
                test:/\.css$/,
                // use: extractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                // }),
                // // css分离后这里需要重新配置，下面就注释了
                use:[
                    {loader: "style-loader"},
                    {loader:"css-loader"}
                ]
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
