module.exports = {
  plugins: [
    require('postcss-cssnext'),
    require('autoprefixer')({ browsers: [
      'last 5 iOS versions',
      'last 5 Android versions',
      'last 5 ExplorerMobile versions',
      'last 5 ChromeAndroid versions',
      'last 5 UCAndroid versions',
      'last 5 FirefoxAndroid versions',
      'last 5 OperaMobile versions',
      'last 5 OperaMini versions',
      'last 5 Samsung versions',
      'last 3 Chrome versions',
      'last 3 Firefox versions',
      'last 3 Safari versions',
      'last 3 Edge versions',
  ] }),
  ]
};
