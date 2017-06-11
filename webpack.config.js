const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const prod = process.argv.indexOf('-p') !== -1;

const config = {
  entry: ['./src/index', './public/stylesheets/main.scss'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      { // regular css files
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1',
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
  ]
};

if (prod) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `'production'`
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
} else {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `'development'`
      }
    })
  );
}

module.exports = config;
