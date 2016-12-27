import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const js = {
  entry: {
    "app": `./src/js/index.js`
  },
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
    path: './dist/js',
    filename: `[name].js`,
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, include: [path.resolve(__dirname, 'src')], loader: 'babel' },
    ],
  },
}

const css = {
  entry: {
    "app": './src/css/app.css'
  },
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
    path: './dist/css',
    filename: `[name].css`,
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')}
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
  ],
  postcss: function() {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-cssnext")(),
    ]
  }
}

export default [js, css]
