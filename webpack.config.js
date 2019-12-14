const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 编译前清除dist目录文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 从html模板自动生成最终html
module.exports = {
    // 入口js路径
    entry: {
       index :'./src/js/index.js',
       login :'./src/js/login.js'
    },
    // 动态监测并实时更新页面
    devServer:{
        contentBase:'./dist',
        port:'8080',
          // 热更新，无需刷新
        hot:'true'
    },
     // 方便追踪源代码错误
     devtool: 'source-map',
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
    ],
    // 编译输出的js及路径
    output: {
        // js生成到dist/js，[name]表示保留原js文件名
        filename: 'js/[name].js',
         // 输出路径为dist
        path: path.resolve(__dirname, 'dist')
    }
};