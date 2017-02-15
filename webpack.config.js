import webpack from 'webpack';
import yargs from 'yargs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import FeatureFlags from 'ff-plugin';
import featureFlagsConfig from './feature.flag.config.json';

yargs.default('env', 'production');

let argv = yargs.argv;
let isDebug = argv.env !== 'production';

let config = {
  debug: isDebug,
  devtool: isDebug ? 'source-map' : false,
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: '[hash].js',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('style', 'css?minimize=' + !isDebug + '&sourceMap=' + isDebug + '!sass-loader')
      },
      {
        test: /\.js|.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'ff-loader',
          'babel-loader?{"presets":["es2015", "react"]}'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[path][hash].[ext]&context=./src',
          'image-webpack?bypassOnDebug'
        ]
      },
      {
        test: /\.(jsx)$/,
        loader: 'auto-import-preloader',
        include: /components|containers/,
        query: {
          source: [
            { 'import': 'React', 'from': 'react' },
          ]
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: []
    }),
    new ExtractTextPlugin("[hash].css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      __DEV__: isDebug,
    }),
    new FeatureFlags(featureFlagsConfig)
  ]
};

let configHtmlPage = {
  template: 'src/index.ejs',
  filename: 'index.html',
  title: 'React'
};

if (!isDebug) {
  configHtmlPage.minify = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  };
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
}

config.plugins.push(new HtmlWebpackPlugin(configHtmlPage));

module.exports = config;
