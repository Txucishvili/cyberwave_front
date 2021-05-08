const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin");
const fs = require("fs");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
const TerserPlugin = require("terser-webpack-plugin");
const {
  BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");
const resolve = require("resolve");
var appCfg = require("./config/config");
const paths = require("react-scripts/config/paths");
const reactCFG = require("react-scripts/config/webpack.config")(process.env.NODE_ENV == 'development' ? 'development' : 'production');
const webpackDevClientEntry = require.resolve("react-dev-utils/webpackHotDevClient");
const reactRefreshOverlayEntry = require.resolve("react-dev-utils/refreshOverlayInterop");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const { forEach } = require("lodash");
const { type } = require("os");


var env = process.env;
const OUTPUT_DIR = "build";

const customLoader = [{
  test: /\.js$/,
  use: [{
    loader: path.resolve("./loader.js"),
    options: {
      name: "[name].[ext]",
      outputPath: (url, resourcePath, context) => {
        // console.log('url', url);
        // console.log('context', context);
        // console.log('resourcePath', resourcePath);

        return "test";
      },
    },
  }, ],
}, ];

const webpackModulesConfig = (env) => {
  return {
    rules: [{
        test: /\.(css|s[ac]ss)$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")],
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
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
            esModule: false,
          },
        }, ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
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
            esModule: false,
          },
        }, ],
      },
      {
        test: /\.(svg|gif|png|eot|woff|ttf)$/,
        loaders: ["url-loader"],
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
    ],
  };
};


const webpackPluginsConfig = (env) => {
  const isEnvDevelopment = env == "development";

  const returnPlugins = [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),

    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync("typescript", {
        basedir: "./",
      }),
      async: env === "development",
      checkSyntacticErrors: true,
      tsconfig: "./tsconfig.json",
      reportFiles: [
        // This one is specifically to match during CI tests,
        // as micromatch doesn't match
        // '../cra-template-typescript/template/src/App.tsx'
        // otherwise.
        "../**/src/**/*.{ts,tsx}",
        "**/src/**/*.{ts,tsx}",
        "!**/src/**/__tests__/**",
        "!**/src/**/?(*.)(spec|test).*",
        "!**/src/setupProxy.*",
        "!**/src/setupTests.*",
      ],
      silent: true,
    }),

    new webpack.ProvidePlugin({
      _: "node_modules/lodash",
    }),

    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: process.env.NODE_ENV || "development",
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      PUBLIC_URL: "https://somecdn.com",
    }),

    new CopyPlugin([{
        from: "./src/images",
        to: "./images",
      },
      {
        from: "./src/assets",
        to: "./assets",
      },
    ]),

    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(process.env.ASSET_PATH),
    }),
  ];
  if (isEnvDevelopment) {
    returnPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        overlay: {
          entry: webpackDevClientEntry,
          // The expected exports are slightly different from what the overlay exports,
          // so an interop is included here to enable feedback on module-level errors.
          module: reactRefreshOverlayEntry,
          // Since we ship a custom dev client and overlay integration,
          // the bundled socket handling logic can be eliminated.
          sockIntegration: false,
        },
        forceEnable: true,
        include: path.resolve(__dirname, './src'),
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
  
        /**
         * Automatically open report in default browser.
         * @default true
         */
        openAnalyzer: true,
  
        /**
         * If true, Webpack Stats JSON file will be generated in bundles output directory.
         * @default false
         */
        generateStatsFile: true,
      }),
    ]);
  } else {
    returnPlugins.concat([new CleanWebpackPlugin(OUTPUT_DIR, {})]);
  }

  return returnPlugins;
};

const genWebpackConfig = (env, argv) => {
  const webpackDevServerConfig = {
    stats: {
      children: false,
      maxModules: 2,
    },
    historyApiFallback: true,
    contentBase: "./",
    hot: true,
    port: 3001,
  };

  const isDevelopment = argv.mode === "development";
  // console.log("[mode]", argv.mode, isDevelopment);

  return {
    mode: argv.mode,
    devtool: isDevelopment ? "source-map" : "",
    devServer: webpackDevServerConfig,
  };
};


var appConfig = appCfg();

// console.log("appConfig", appConfig.APP_VERSION);
// console.log("webpackDevClientEntry", webpackDevClientEntry);

module.exports = (env) => {
  var isEnvDevelopment = env == "development";


  // change
  var jsFiles = ["./src/app/index.tsx"];
  var sassFiles = ["./src/sass/style.scss"];
  var devDep = [];

  const modules = {
    outerStyle: sassFiles,
    app: jsFiles,
  };

  const returnModules = [].concat(Object.values(modules).map(e => e.toString()));

  console.log('returnModules', returnModules);


  if (env == "development") {
    // devDep.push(webpackDevClientEntry);
    // devDep.push('webpack-hot-middleware/client');
    // devDep.push(`webpack-hot-middleware/client?path=http://${'localhost'}:${3001}/__webpack_hmr`);
  }

  var appFiles = Object.assign({}, {
    mode: env,
    name: "app",
    entry: [].concat(returnModules),
    target: "web",
    devtool: isEnvDevelopment && "cheap-module-source-map",
    output: {
      path: !isEnvDevelopment ? path.resolve(__dirname, OUTPUT_DIR) : undefined,
      filename: `[name]-[hash].${appConfig.APP_VERSION.slice(
          0,
          1
        )}.bundle.js`,
      sourceMapFilename: "[file].map",
      jsonpFunction: "_[name]",
      chunkFilename: !isEnvDevelopment ?
        "[name].[contenthash:5].chunk.js" : `[name]-[contenthash:5].${appConfig.APP_VERSION.slice(
                0,
                1
              )}.chunk.js`,
      hashDigestLength: 5,
    },
    module: webpackModulesConfig(env),
    plugins: webpackPluginsConfig(env),
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
      alias: {
        ...(isEnvDevelopment && {
          "react-dom$": "react-dom/profiling",
          "scheduler/tracing": "scheduler/tracing-profiling",
        }),
      },
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        // minSize: 20000,
        // minRemainingSize: 0,
        minChunks: 1,
        // maxAsyncRequests: 30,
        maxInitialRequests: 30,
        // enforceSizeThreshold: 50000,
      },
      minimize: true,
      minimizer: [].concat(reactCFG.optimization.minimizer),
    },
  });
  // stats: 'verbose',

  // console.log('----- 1 ----- ', Object.assign({}, reactCFG ));
  // console.log(' ----- ', Object.assign({}, {...appFiles} ));
  console.log('aaa');

  const mergeConfig = Object.assign({}, appFiles, {
    entry: appFiles.entry,
    output: appFiles.output,
    optimization: appFiles.optimization,
    plugins: [].concat(reactCFG.plugins, appFiles.plugins),
    module: Object.assign(reactCFG.module, appFiles.module),
  });
  return mergeConfig;
};