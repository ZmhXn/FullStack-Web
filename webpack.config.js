const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const extractLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader

//__dirname 动态获取 可以用来获取当前文件模块所属目录的绝对路径
//__filename 动态获取 可以用来获取当前文件的绝对路径
 
const webpackConfig = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].[hash].bundle.js', //chunkhush 只用于生产环境,
        library: 'myLibrary',
        chunkFilename: '[name].[hash].chunk.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: { //导入以这些结尾的文件，不用写后缀名
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    optimization: { //分为更小的模块
        // runtimeChunk: 'single',
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             chunks: "initial",
        //             minChunks: 2,
        //             maxInitialRequests: 5,  // The default limit is too small to showcase the effect
        //             minSize: 0              // This is example is too small to create commons chunks
        //         },
        //         vendor: {
        //             test: /[\\/]node_modules[\\/]/,
        //             chunks: "initial",
        //             name: "vendors",
        //             priority: 10,
        //             enforce: true,
        //             chunks: 'all'
        //         }
        //     }
        // }
    },
    devServer: { //使用webpack-dev-server，提高开发效率
        contentBase: 'dist',
        hot: true,
        port: 8888,
        inline: true, //实时刷新
        historyApiFallback: true,  //不跳转
        disableHostCheck: true,
        proxy: [ //代理，解决跨域
            {
                context: ['/api/**'],
                target: 'http://localhost:3000',
                secure: false,
                changeOrigin: true,
                pathRewrite: { 
                    '^/api': ''
                }
            }
        ],
        /*打开浏览器 并打开本项目网址*/
        open: true  
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/,
                use: [extractLoader, 'css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [extractLoader, 'css-loader', {
                    loader: 'less-loader',
                    options: { javascriptEnabled: true }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                        outputPath: 'images/'   // 图片打包后存放的目录
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            favicon: `${__dirname}/public/favicon.ico`, //设置favicon图标路径
            template: `${__dirname}/public/index.html`, //html模板路径
            filename: 'index.html', //生成的html存放路径，相对于 path
            inject: true, //允许插件修改哪些内容，包括head与body js插入的位置，true/'head'/'body'/false
            hash: true,//为静态资源生成hash值，可以实现缓存
        })
    ]
}

module.exports = webpackConfig
