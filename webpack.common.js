const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 编译前清除dist目录文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 从html模板自动生成最终html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const webpack = require('webpack');
module.exports = {
    // 入口js路径
    entry: {
       index :'./src/js/index.js',
       login :'./src/js/login.js'
    },
    plugins:[
        new CleanWebpackPlugin(),
        // 设置html模板生成路径
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/html/index.html',
            chunks:['style','index'] // 公共样式分离
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/html/login.html',
            chunks: ['styel','login'] // 公共样式分离style
        }),
        new MiniCssExtractPlugin({
              filename: 'css/[name].css'
         }),
    ],
    optimization: {
        // 代码分割
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /jquery/,
                    name: 'jquery',
                    chunks: 'all'
                },
                styles: {
                    test: /[\\/]common[\\/].+\.css$/,
                    name: 'style',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
              rules: [
                  {
                      test: /\.js$/,
                     exclude: /(node_modules|bower_components)/,
                      use: {
                          loader: 'babel-loader',
                          options: {
                              presets: ['@babel/preset-env'],
                              plugins: [
                                 '@babel/plugin-transform-runtime',
                                  '@babel/plugin-transform-modules-commonjs'
                              ]
                          }
                      }
                  },
                  {
                    test: /\.css$/,
                    use: [
                        // 将原来的style-loader替换
                        MiniCssExtractPlugin.loader,
                        // 'style-loader',
                        'css-loader'
                    ]
                },
                {
                     test: /\.less$/,
                        use: [
                            // 将原来的style-loader替换
                            MiniCssExtractPlugin.loader,
                        //   'style-loader',
                          'css-loader',
                          'less-loader'
                            ]
                },
                {
                    test:/\.(png|svg|jpg|gif|webp)$/,
                    use:[
                        {
                            loader:'url-loader',
                            options:{
                                // 最终生成的css代码中,图片url前缀
                                publicPath: '../images',
                                // 图片输出的实际路径(相对于dist)
                                outputPath: 'images',
                                // 当小于某KB时转为base64
                                limit: 0
                            }
                        }
                    ]
                },
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                            options: {
                                attrs: ['img:src', 'img:data-src', 'audio:src'],
                                    minimize: true
                                }
                        }
                }
              ]
           },
        
    // 编译输出的js及路径
    output: {
        // js生成到dist/js，[name]表示保留原js文件名
        filename: 'js/[name].js',
         // 输出路径为dist
        path: path.resolve(__dirname, 'dist')
    }
};