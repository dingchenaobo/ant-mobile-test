/**
 *@discription 公共配置
 */
const path = require('path'); // 路径处理
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 打包前先清空目录
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html文件，动态引入打包后的js文件
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象

// resource code path
const SRC_PATH = path.resolve('./src'); // path.resolve 获取绝对路径
// tnpm run build resource path
const ASSETS_BUILD_PATH = path.resolve('./build');

module.exports = {
  context: SRC_PATH, // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  resolve: { // 配置模块如何解析。
    extensions: ['.ts', '.tsx', '.js', '.json'], // 能够使用户在引入模块时不带这些扩展名
    alias: { // 创建 import 或 require 的别名，来确保模块引入变得更简单
      '@': SRC_PATH, // './src/test' === '@/test'
    },
  },
  entry: { // 入口文件
    index: ['./app']
  },
  output: { // 输出
    path: ASSETS_BUILD_PATH, // 输出到这个文件夹里面去
    filename: './[name].js' // 每个输出 bundle 的名称
  },
  module: { // 配置loader
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'tslint-loader'
      },
      {
        test: /\.(jsx|tsx|js|ts)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                  libraryName: 'antd-mobile',
                  style: 'css',
                })]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            },
          },
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [ // 指需要什么样的loader去编译文件
            'css-loader',
            'postcss-loader'
          ],
          fallback: 'style-loader'// 编译后用什么loader来提取css文件
        }),
        include: /node_modules/ // 包括node_modules
      },
    ]
  },
  plugins: [ // 插件配置
    new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false }),  // verbose 控制台是否输出日志
    new HtmlWebpackPlugin({
      title: 'ant-mobile-demo', // 模板的标题
      template: '../index.html', // 以这个index.html文件为模板生成dist/index.html文件
      hash: true, // 是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
      data: process.env.NODE_ENV
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true, // 是否抽取其他附加的 chunks 里的style
      ignoreOrder: true // 禁用顺序检查
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // 表示显示块的范围
      cacheGroups: { // 缓存组
        vendor: {
          test: /node_modules\//,
          name: 'vendor',
          priority: 10,
          enforce: true
        },
      }
    }
  },
  externals: { // 想引用这些库，但是又不想让webpack打包
    react: 'React',
    'react-dom': 'ReactDOM',
  }
};
