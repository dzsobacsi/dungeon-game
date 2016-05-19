var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }, {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass'],
        exclude: /node_modules/
      }
    ]
  },
  // resolve: {
  //   extensions: ['', '.js']
  // },
  // devServer: {
  //   contentBase: '.',
  //   hot: true
  // }
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
