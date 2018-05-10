/*
* @Author: guanxy
* @Date:   2018-04-14 21:52:49
* @Last Modified by:   guanxy
* @Last Modified time: 2018-05-10 12:26:02
*/
const path = require('path');
const webpack =require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let WEBPACK_ENV=process.env.WEBPACK_ENV || 'dev'; //定义一个环境变量
console.log(WEBPACK_ENV);
module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    //在环境配置里判断环境
    publicPath: WEBPACK_ENV==='dev'?'/dist/':'./',
	  filename: 'js/app.jsx'
  },
  resolve:{
    alias:{
      page     :path.resolve(__dirname, 'src/pages'),
      component:path.resolve(__dirname, 'src/component'),
      util     :path.resolve(__dirname, 'src/util'),
      service  :path.resolve(__dirname, 'src/service')
    }
  },
  module: {
  rules: [
    { //jsx文件的处理
      test: /\.jsx$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env','react']
        }
      }
    },
    {  //CSS文件的处理
       test: /\.css$/,	
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
    },
    { //sass文件的处理
      test: /\.scss$/,
      use: [{
          loader: "style-loader" // 将 JS 字符串生成为 style 节点
      }, {
          loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
      }, {
          loader: "sass-loader" // 将 Sass 编译成 CSS
      }]
    },
      { //图片文件处理
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            }
          }
        ]
      },
      {//图标字体加载配置
         test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: [
            {
             loader: 'url-loader',
               options: {
                  limit: 8192,
                  name:'resource/[name].[ext]'
               }
            }
          ]
      }
  ]
},
  plugins: [
    //处理html文件
     new HtmlWebpackPlugin({
     	template:'./src/index.html'
     }),
     //独立css文件
     new ExtractTextPlugin('css/[name].css'),
     //提出公共模块
     new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
     })
  ],
  devServer: {
    //指定一个端口.8080容易被占用
    port:8086,
    historyApiFallback:{
      index:'/dist/index.html'
    },
    //自动代理
    proxy:{
      '/manage':{
        target:'http://admintest.happymmall.com',
        changeOrigin:true
      },
      '/user/logout.do':{
        target:'http://admintest.happymmall.com',
        changeOrigin:true
      }
    }
    
   },
};