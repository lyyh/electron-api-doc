/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from './app/package.json';

export default {
  externals: Object.keys(externals || {}),

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    },{
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader',
      ]
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
    alias: {
      reducers: path.join(__dirname, "app/reducers"),
      public: path.join(__dirname, "app/public"),
      components: path.join(__dirname, "app/components"),
      actions: path.join(__dirname, "app/actions"),
      containers: path.join(__dirname, "app/containers"),
      mixins : path.join(__dirname, "app/mixins"),
      utils: path.join(__dirname,'app/utils')
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin(),
  ],
};
