/* eslint-env node */

var path = require('path')
var webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin')

var port = process.env.PORT || 8080

module.exports = {
  devServer: {
    port: port,
    contentBase: 'app/',
    publicPath: '/', // script src = {publicPath}/bundle.js
    hot: true,
    historyApiFallback: true
  },
  devtool: ifprod('source-map', 'cheap-eval-source-map'),
  entry: ifprod('./app/index', [
    // Enable hot-reload on "/"
    // Can be skipped if going to "/webpack-dev-server/"
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server',
    // Main entry point
    './app/index'
  ]),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/' // script src = {publicPath}/bundle.js
  },
  plugins: ifprod([
    new CompressionPlugin({
      asset: '{file}.gz',
      algorithm: 'gzip',
      regExp: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ], [
    // Load only required locales from moment
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]),
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ifprod(['babel'], ['react-hot', 'babel']),
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loaders: ['style', 'css', 'stylus']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  }
}

function ifprod (yes, nope) {
  return process.env.NODE_ENV === 'production' ? yes : nope
}
