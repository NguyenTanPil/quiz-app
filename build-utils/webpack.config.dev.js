const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 4000,
    open: true,
    hot: true,
    historyApiFallback: true,
    contentBase: 'public',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|jp2|webp)$/i,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
