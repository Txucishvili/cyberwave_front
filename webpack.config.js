const path = require('path');
const webpack = require('webpack');
const clientLoaders = require('./webpack/loaders');
const babelLoader = require('./webpack/loaders/babel.loader');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const dist = path.join(__dirname, 'dist');
const SRC_DIR = path.join(__dirname, './');

var hotMiddlewareScript =
	'webpack-hot-middleware/client?path=/__webpack_hmr';


const webpackDevClientEntry = require.resolve(
	'react-dev-utils/webpackHotDevClient'
);
const env = require('dotenv').config().parsed;

const {
	NODE_ENV,
	PORT,
	WEBPACK_DEV_SERVER,
	WEBPACK_MODE
} = env;

let webpackMode = process.env.NODE_ENV === 'development' ? process.env.NODE_ENV : 'production';

let isDev = webpackMode === 'development';
// isDev = false;
// webpackMode = 'production';

module.exports = (opts = {}) => {
	const {
		mode,
		scriptBuild
	} = opts;

	let config = {
		mode: webpackMode,
		outputPath: path.join(__dirname, 'dist'),
	};

	if (!!scriptBuild) {
		config = Object.assign(config, {
			...opts
		});
	}

	console.log('---config', config);

	return [{
		name: 'client',
		context: SRC_DIR,
		mode: config.mode,
		cache: false,
		target: 'web',
		stats: {
			all: true,
			assets: false
		},
		entry: isDev ? [
			'react-hot-loader/patch',
			hotMiddlewareScript,

			// webpackDevClientEntry,
			'./client/index.js'
		] : './client/index.js',
		output: {
			path: config.outputPath,
			filename: '[name].js',
			publicPath: "/",
			libraryTarget: 'var',
			hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
			hotUpdateMainFilename: '.hot/[hash].hot-update.json',
		},
		devtool: 'source-map',
		module: {
			rules: [
				...clientLoaders.rules,
				babelLoader,
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
				}
			]
		},
		optimization: {
			moduleIds: 'hashed',
			runtimeChunk: {
				name: (entrypoint) => `runtime~${entrypoint.name}`,
			},
			splitChunks: {
				chunks: function(chunk) {
					// exclude `my-excluded-chunk`
					console.log('hiiiiiiiiiiiit', chunk);
					return chunk.name !== 'my-excluded-chunk';
				},
				minChunks: 1,
				maxAsyncRequests: 30,
				enforceSizeThreshold: 50000,
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 0,
				cacheGroups: {
					reactVendor: {
						test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
						name: 'react~react-dom',
						chunks: 'all',
					},
					bootstrap: {
						test: /[\\/]node_modules[\\/]/,
						chunks: "all",
						name: "bootstrap",
						enforce: true,
						minChunks: Infinity
					},
				},
			},
		},
		externals: {},
		plugins: [
			isDev ? new webpack.HotModuleReplacementPlugin() : null,
			new StatsWebpackPlugin(`${'client'}-stats.json`, {
				chunkModules: true
			}),
			// new webpack.optimize.SplitChunksPlugin({
			// 	name: 'bootstrap',
			// 	filename: 'bootstraps.js',
			// 	minChunks: Infinity
			// }),
			new BundleAnalyzerPlugin({
				openAnalyzer: false
			})
		].filter(Boolean),
		node: {
			// Prevents the `process.env` defined on the `window` in Html.js
			// from being re-defined inside modules by https://github.com/webpack/node-libs-browser
			process: true
		},
		resolve: {
			modules: ['node_modules'],
			extensions: [".tsx", ".ts", ".js", ".scss", "css"],
			alias: {
				...(isDev && {
					// 'react-dom': '@hot-loader/react-dom',
					// "scheduler/tracing": "scheduler/tracing-profiling",
				}),
			},
		},
	}, {
		name: 'server',
		context: SRC_DIR,
		mode: config.mode,
		target: 'node',
		cache: false,
		entry: {
			server: './server/src/server.js'
		},
		output: {
			path: config.outputPath,
			filename: '[name].js',
			libraryTarget: 'commonjs2',
			publicPath: "/",
		},
		devtool: 'source-map',
		optimization: {
			moduleIds: 'named'
		},
		module: {
			rules: [
				...clientLoaders.rules,
				{
					test: /\.ts$/,
					use: [
						'ts-loader',
					]
				},
				babelLoader,
			]
		},
		node: {
			// Prevents the `process.env` defined on the `window` in Html.js
			// from being re-defined inside modules by https://github.com/webpack/node-libs-browser
			process: false
		},
		externals: [
			fs
			.readdirSync('node_modules')
			.filter(
				// Bundle react-loadable to avoid having to define
				// `serverSideRequirePath` as well as `webpackRequireWeakId`
				// in Loadable HoCs.
				x => !x.includes('.bin') && !x.includes('react-loadable')
			)
			.reduce((externals, mod) => {
				externals[mod] = `commonjs ${mod}`;
				return externals;
			}, {}),
			nodeExternals()
		],
		plugins: [
			new webpack.NamedModulesPlugin()
		],
		resolve: {
			extensions: [".tsx", ".ts", ".js", ".scss"],
		},
		bail: true
	}]
};