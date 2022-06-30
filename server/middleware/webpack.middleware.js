const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackconfig = require('../../_webpack.config.js');

const Router = express.Router();
const config = webpackconfig({mode: ''});
const compiler = webpack(config);


Router.use(webpackDevMiddleware(compiler, {
  publicPath: config[1].output.publicPath,
}));

Router.use(
  webpackHotMiddleware(
    compiler.compilers.find(compiler => compiler.name === 'client'), {
      log: () => {
        console.log('logger');
      }
    }
  )
);

Router.use(webpackHotServerMiddleware(compiler, {
  chunkName: 'server',
  serverRendererOptions: {
    foo: 'Bar'
  },
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));
// console.log('compiler', compiler);
module.exports = Router;