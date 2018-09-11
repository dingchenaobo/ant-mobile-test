const baseConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

baseConfig.mode = 'development';

baseConfig.devServer = {
  port: 4200,
  host: '0.0.0.0',
  historyApiFallback: true
};

if (process.env.NODE_ENV === 'mock') {
  baseConfig.devServer.proxy = {
    '/api': {
      pathRewrite: {'^/api': ''},
      target: 'http://localhost:4201',
      changeOrigin: true, // 跨域
      secure: false // accept ssl
    }
  };
}

baseConfig.devtool = 'source-map';

baseConfig.module.rules.push(
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'typings-for-css-modules-loader',
          options: {
            modules: true,
            namedExport: true,
            camelCase: true,
            minimize: true,
            localIdentName: "[path][local]_[hash:base64:4]"
          }
        },
        'postcss-loader',
        'less-loader',
      ],
      fallback: 'style-loader'
    }),
    exclude: /node_modules/
  },
);

baseConfig.plugins.push(
  // @link => https://github.com/NekR/offline-plugin/blob/master/docs/options.md
  new OfflinePlugin({
    autoUpdate: 1000 * 60 * 2, // 更新 (ms)
    responseStrategy: 'cache-first',
    caches: {
      /**
       * @link => https://github.com/NekR/offline-plugin/blob/master/docs/caches.md
       * 
       * main: [] 这里配置的是serviceWorker在install阶段需要缓存的文件清单，如果其中有一个失败了，那么整个serviceWorder就会安装失败，所以必须谨慎配置
       * 
       * additional: [] 这里配置的文件清单会在serviceWorker activate的时候进行缓存，与main不一样，如果这里的文件缓存失败，不会影响serviceWorker的正常安装。而且，在接下来页面的ajax异步请求中，还能进行缓存尝试
       * 
       * optional: [] 这里配置的文件清单在serviceWorker安装激活阶段不会进行缓存，只有在监听到网络请求的时候才进行缓存
       */
      main: [
        /\.(jsx?|tsx?)(\?.*)?$/,
        /\.(css|less)(\?.*)?$/,
        /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        /\.(woff2?|eot|ttf|otf)(\?.*)?$/
      ],
      additional: [
        ':externals:'
      ],
      optional: []
    },
    externals: [ // 设置外部链接，例如配置http://hello.com/getuser，那么在请求这个接口的时候就会进行接口缓存
      "https://cdn.bootcss.com/react/16.4.0/umd/react.production.min.js",
      "https://cdn.bootcss.com/react-dom/16.4.0/umd/react-dom.production.min.js",
      "https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js",
    ],
    excludes: [
      // 需要过滤的文件
      '**/.*',
      '**/*.json',
      '**/*.map',
      '**/*.gz',
      '**/manifest-last.json'
    ], 
    ServiceWorker: {
      output: './sw.js', // 输出目录
      publicPath: './sw.js', // sw.js 加载路径
      events: true, // 当sw状态改变时候发射对应事件
      // scope: '/', // 作用域（此处有坑）
      // minify: true, // 开启压缩，没有必要 webpack已配置压缩
    }
  }),
);

module.exports = baseConfig;
