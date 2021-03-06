var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    './src/js/render.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel?optional[]=runtime'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['last 3 versions'] })];
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'react-template',
      template: './src/index.html',
      favicon: './src/favicon.ico',
      scriptFilename: 'app.min.js'
    })
  ]
};
