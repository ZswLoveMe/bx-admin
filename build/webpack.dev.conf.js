'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const express = require('express')
let app = express()

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app){
      app.use(function(req, res, next) {
        // 检查token
        if (/^\/api/.test(req.path)) {
          // 之校验/api开头的请求
          console.log("token:" + req.headers.token);
          if (req.path == "/api/login" || req.headers.token) {
            next();
          } else {
            res.sendStatus(401); // 错误状态提示用户需要登录
          }
        } else {
          next();
        }
      });

      app.get('/test/loadAvatar',(req,res)=>{
        const {email} = req.query
        if(email == 'zsw123'){
          res.json({
            code:0,
            avatarUrl:'/static/img/avatar_1.jpg'
          })
        }else{
          res.json({
            code:3,
          })
        }
      })
      
      app.post("/api/login", function(req, res) {
        console.log("用户登录");
        let body = [];
        req
          .on("data", chunk => {
            // 接收到一部分数据
            console.log(chunk); //chunk是Buffer对象
            body.push(chunk);
          })
          .on("end", () => {
            // 数据接收完毕
            // 将body转换为完整的buffer
            body = Buffer.concat(body).toString();
            // 转换并保存前台传递的user
            const { email, password } = JSON.parse(body); //{name:'aaa',age:20}
            if (email === "zsw123" && password === "123123") {
              res.json({
                code: 0,
                token: "jilei",
                avatar:'/static/img/avatar_1.jpg'
              });
            } else {
              res.json({
                code: 1,
                message: "用户名或密码错误"
              });
            }
          });
      });
      let menuList = [
        {
          label:'菜单1',
          
          child:[
            {
              label:'子菜单'
            }
          ]
        }
      ]
      app.get('/api/menus',(req,res) =>{
        res.json({

        })
      })
      app.get("/api/logout", function(req, res) {
        res.json({ code: -1 });
      });
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
