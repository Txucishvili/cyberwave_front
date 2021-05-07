const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const fs = require('fs');

const customLoader = [{
  test: /\.js$/,
  use: [{
    loader: path.resolve('./loader.js'),
    options: {
      name: '[name].[ext]',
      outputPath: (url, resourcePath, context) => {

        // console.log('url', url);
        // console.log('context', context);
        // console.log('resourcePath', resourcePath);

        return 'test';
      }
    }
  }]
}, ]

const webpackModulesConfig = {
  rules: [{
      test: /\.(css|s[ac]ss)$/,
      use: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')
            ],
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        },
      ]
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: (url, resourcePath, context) => {
            // `resourcePath` is original absolute path to asset
            // `context` is directory where stored asset (`rootContext`) or `context` option

            // To get relative path you can use
            // const relativePath = path.relative(context, resourcePath);

            // console.log('url', url);
            // console.log('context', context);
            // console.log('resourcePath', resourcePath);

            if (/my-custom-image\.png/.test(resourcePath)) {
              return `other_output_path/${url}`;
            }

            if (/images/.test(context)) {
              return `image_output_path/${url}`;
            }

            return path.relative(`${context}/src`, resourcePath);
          },
          esModule: false
        }
      }, ],
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: (url, resourcePath, context) => {
            // `resourcePath` is original absolute path to asset
            // `context` is directory where stored asset (`rootContext`) or `context` option

            // To get relative path you can use
            // const relativePath = path.relative(context, resourcePath);

            // console.log('url', url);
            // console.log('context', context);
            // console.log('resourcePath', resourcePath);

            if (/my-custom-image\.png/.test(resourcePath)) {
              return `other_output_path/${url}`;
            }

            if (/images/.test(context)) {
              return `image_output_path/${url}`;
            }

            return path.relative(`${context}/src`, resourcePath);
          },
          esModule: false
        }
      }]
    },
    {
      test: /\.(svg|gif|png|eot|woff|ttf)$/,
      loaders: [
        'url-loader'
      ]
    },
    {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
      },
    },
  ]
}

const webpackPluginsConfig = [
  new CleanWebpackPlugin('dist', {}),
  new MiniCssExtractPlugin({
    filename: 'style.css',
    chunkFilename: "[id].css"
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
  }),
  // new CopyPlugin([{
  //     from: './src/images',
  //     to: './images'
  //   },
  //   {
  //     from: './src/assets',
  //     to: './assets'
  //   }
  // ])
]
const webpackDevServerConfig = {
  stats: {
    children: false,
    maxModules: 0
  },
  port: 3001,
}
const genWebpackConfig = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  console.log('[mode]', argv.mode, isDevelopment);

  return {
    mode: argv.mode,
    devtool: isDevelopment ?
      'source-map' : '',
    devServer: webpackDevServerConfig
  }
}

const directoryPath = path.join(__dirname, 'src/js');
var walk = async function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (async function next() {
      var file = list[i++];
      // console.log('file', file, i, i++);
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      // console.log('file [path]', file, i, i++);

      await fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            // console.log('stat', res);
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

var readFiles = async (path) => {
  return new Promise(function (resolve, reject) {
    walk(path, function (error, results) {
      resolve(results.map(i => '.' + i.replace(__dirname, '')));
    });
  });
};

var collectByPath = (files, pathTarget) => {
  return files.map(i => {
    return i
  }).filter(i => i.search(`.${pathTarget}.js`) != -1)
};

module.exports = async (env, argv) => {
  const jsFiles = ['./src/js/index.js'];
  const sassFiles = ["./src/sass/style.scss"];
  const filesMap = await readFiles(directoryPath);

  const allFileMap = filesMap.filter(i => i.search(`.${'lazy'}.js`) == -1);
  const lazyFileMap = collectByPath(filesMap, 'lazy');


  var appFiles = Object.assign({}, genWebpackConfig(env, argv), {
    name: 'app',
    entry: {
      index: [].concat(allFileMap, sassFiles),
    },
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "[name]-[hash].bundle.js",
      sourceMapFilename: '[file].map',
    },
    module: webpackModulesConfig,
    plugins: webpackPluginsConfig,
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  });

  var lazyFiles = lazyFileMap.map(i => {
    const name = path.basename(i, '.lazy.js');
    console.log('name', i.replace('src', 'dist').split('/'));
    return Object.assign({}, genWebpackConfig(env, argv), {
      name: 'app',
      entry: {
        [name]: [].concat(lazyFileMap),
      },
      output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name]-[hash].bundle.js",
        sourceMapFilename: '[file].map',
      },
      module: {
        rules: webpackModulesConfig.rules.concat([])
      },
      plugins: []
    });
  })

  return [appFiles, ...lazyFiles];
};