import path from 'path';
import webpack from 'webpack';
import BabelEnginePlugin from 'babel-engine-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import dotenv from 'dotenv';
import pkg from './package.json';

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, './src/client/index.js'),
  build: path.join(__dirname, './dist')
};
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const config = {
  entry: ['webpack-hot-middleware/client?reload=true', 'babel-polyfill', PATHS.app],
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: `${pkg.version}.bundle.js`,
    chunkFilename: '[name].bundle.js'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      Components: path.resolve(__dirname, 'src/client/components')
    },
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules']
  },
  target: 'web',
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  // performance: {
  //   hints: 'error',
  //   maxEntrypointSize: 512000,
  //   maxAssetSize: 512000
  // },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /test\.js$/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react']
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.gif$/, use: 'url-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?mimetype=application/font-woff' },
      {
        test: /\.(jpg|png|ttf|eot|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name]-[hash:7].[ext]'
        }
      },
      {
        test: /\.(ogg|mp3|wma)$/,
        use: 'file-loader'
      },
      { test: /\.json$/, use: 'json-loader' },
      {
        include: /\.pug/,
        use: ['raw-loader', 'pug-html-loader']
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    proxy: {
      '*': {
        target: 'http://localhost:3000'
      }
    },
    host: '127.0.0.1',
    port: process.env.PORT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(envKeys)
  ]
};

if (TARGET === 'start' || TARGET === 'dev' || !TARGET) {
  config.mode = 'development';
  config.devtool = 'cheap-module-eval-source-map';
  const DefineDevEnvPlugin = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  });
  config.plugins.push(DefineDevEnvPlugin);
  module.exports = config;
}
if (TARGET === 'build' || TARGET === 'start-prod') {
  config.mode = 'production';
  const uglify = new UglifyJSPlugin({
    test: /\.(js)$/,
    exclude: /node_modules/,
    cache: true,
    parallel: true,
    sourceMap: true,
    uglifyOptions: {
      warnings: false,
      parse: {},
      compress: {},
      mangle: true,
      output: null,
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_fnames: false
    }
  });

  const babelPlugin = new BabelEnginePlugin({ presets: ['es2015'] });

  const DefineProdEnvPlugin = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  });

  config.plugins.push(DefineProdEnvPlugin);
  config.plugins.push(babelPlugin);
  config.plugins.push(uglify);
  module.exports = config;
}
