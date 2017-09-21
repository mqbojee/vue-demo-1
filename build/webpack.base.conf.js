const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

const glob = require('glob');

let entries = getEntry('./src/modules/**/*.js');//获得入口js文件 多页面

//todo 获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  //todo webpack入口文件
  entry: entries,
  //todo webpack输出路径和命名规则
  output: {
    //todo webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    //todo webpack输出bundle文件命名格式
    filename: '[name].js',
    //todo webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //todo 模块resolve的规则
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    //todo 别名，方便引用模块，例如有了别名之后，
    //todo import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'modules': resolve('src/modules'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
      /*,
      'kendoUi':  path.resolve('./src/modules/vendor/kendoUi/js'),
      'kendoUiStyles': path.resolve('./src/modules/vendor/kendoUi/styles')*/
    }
    /*,
    modulesDirectories:[
      resolve('node_modules'),
      path.resolve('./src/modules/vendor/kendoUi/js')
    ]*/
  },
  //todo 不同类型模块的处理规则
  module: {
    rules: [
      {//todo 对所有.vue文件使用vue-loader进行编译
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {//todo 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {//todo 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,//todo 小于10K的图片转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath('img/[name].[hash:7].[ext]')//todo 其他的图片转移到静态资源文件夹
        }
      },
      {//todo 对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {//todo 对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ]
};

function getEntry(globPath) {
  let entries = {},basename,tmp,pathname;
  if (typeof (globPath) !== "object") {
    globPath = [globPath]
  }
  globPath.forEach((itemPath) => {
    glob.sync(itemPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));
      if (entry.split('/').length > 4) {
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        entries[pathname] = entry;
      } else {
        entries[basename] = entry;
      }
    });
  });
  console.log(entries);
  return entries;
}
