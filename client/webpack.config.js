const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
			},
			{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src')
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'public', 'dist')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: { sourceMap: false }
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 0,
      minRatio: 0.8
    }),
    new Dotenv()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
	}
};

const isAnalyze = process.env.ANALYZE === 'true';

if (isAnalyze) {
  module.exports.plugins.push(new BundleAnalyzerPlugin());
}
