var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var isRelease = process.argv.indexOf('--release') >= 0 ? true : false;

module.exports = {
  cache: true,
  entry: {
    lib: ['react', 'react-dom', 'react-router'],
    layout: './src/index.jsx'
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'src'],
    alias: {
      'react': path.join(__dirname, 'node_modules/react/dist/react.min.js'),
      'react-dom': path.join(__dirname, 'node_modules/react-dom/dist/react-dom.min.js'),
      'react/addons': path.join(__dirname, 'node_modules/react/dist/react-with-addons.min.js'),
      'react-router': path.join(__dirname, 'node_modules/react-router/umd/ReactRouter.min.js')
    }
  },
  output: {
    path: './build/',
    filename: 'rsb.[name].js',
    library: ['rsb', '[name]'],
    libraryTarget: 'umd',
    // pathInfo: true
  },
  // externals: {
  //   'react-router': 'window.ReactRouter'
  // },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel",
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties']
        }
      },
      { test: /(\.less|\.css)$/, loader: "style!css!less" }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('lib', 'rsb.lib.js'),
    ...(!isRelease ? [] : [new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['module', 'exports', 'require']
      },
      compress: {
        warnings: false,
      }
    })]),
    new HtmlWebpackPlugin({
      template: './src/assets/index.html'
    }),
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    port: 8081,
    contentBase: './build',
    hot: true,
    quiet: false,
    historyApiFallback: true,
    noInfo: false,
    lazy: true,
    filename: "index.html",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    publicPath: "/build/",
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true },
  }
};