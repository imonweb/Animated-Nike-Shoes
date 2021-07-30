const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const glob = require('glob');
const PurgeFontawesomePlugin = require('purge-fontawesome/webpack-plugin');


const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()]
  },
  devServer: {
    before: function(dist, server){
      server._watch('./dist/*.html')
    },
    contentBase: path.join(__dirname, 'src'),
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './fonts'
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|svg|png|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: 'images/'
        }
      }
    ]
  },
   plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
          filename: './index.html',
          template: './src/index.html'
        }),
          new CopyPlugin({
          patterns: [
            { from: "src/images/", to: "images" },
            // { from: "other", to: "public" },
    ], }),
          new PurgeFontawesomePlugin({
            paths: [
                glob.sync(path.join(__dirname, 'src/**/*'),  { nodir: true }),
            ],
        }),
    ],
}