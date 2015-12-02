
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var isRelease = process.argv.indexOf('--release') >= 0 ? true : false;

module.exports = {
  cache: true,
  entry: {
    layout: (isRelease ? ['./src/index.jsx'] : ['webpack/hot/dev-server', './src/index.jsx']),
    lib: ['react', 'react-dom', 'react-router', 'whatwg-fetch']
  },
  // resolve: {
  //   root: path.join(__dirname, 'src'),
  //   extensions: ['', '.js'],
  //   modulesDirectories: ['node_modules', 'src'],
  //   alias: {
  //     'react': path.join(__dirname, 'node_modules/react/dist/react.min.js'),
  //     'react-dom': path.join(__dirname, 'node_modules/react-dom/dist/react-dom.min.js'),
  //     'react/addons': path.join(__dirname, 'node_modules/react/dist/react-with-addons.min.js'),
  //     'react-router': path.join(__dirname, 'node_modules/react-router/umd/ReactRouter.min.js')
  //   }
  // },
  output: {
    path: (isRelease ? './deploy/' : './build/'),
    filename: '[name].js',
    publicPath: '/src/assets/'
    // library: ['rsb', '[name]'],
    // libraryTarget: 'umd',
    // pathInfo: true
  },
  externals: {
    'whatwg-fetch': 'fetch'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel",
        query: {
          presets: ['stage-0', 'react', 'es2015'],
          plugins: ['transform-class-properties']
        }
      },
      { test: /(\.less|\.css)$/, loader: "style!css!less!autoprefixer?safe=true" }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
    ...(!isRelease ? [] : [new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['module', 'exports', 'require']
      },
      compress: {
        warnings: false,
      }
    })]),
    // new HtmlWebpackPlugin({
    //   template: './src/assets/index.html'
    // }),
    new webpack.NoErrorsPlugin()
  ],
  // devServer: {
  //   port: 8082,
  //   contentBase: './build',
  //   hot: true,
  //   quiet: false,
  //   historyApiFallback: true,
  //   noInfo: false,
  //   lazy: true,
  //   filename: "index.html",
  //   watchOptions: {
  //     aggregateTimeout: 300,
  //     poll: 1000
  //   },
  //   publicPath: "./src/assets/",
  //   headers: { "X-Custom-Header": "yes" },
  //   stats: { colors: true },
  // }
};