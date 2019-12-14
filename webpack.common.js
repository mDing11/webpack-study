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
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/html/login.html',
            chunks: ['login']
        }),
        new MiniCssExtractPlugin({
              filename: 'css/[name].css'
         }),
    ],
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