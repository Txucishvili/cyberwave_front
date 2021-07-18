const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackconfig = require('../../webpack.config.js');

const Router = express.Router();
const config = webpackconfig({mode: ''});
const compiler = webpack(config);


const path = require('path');
const ms = require('ms');

const DIST_DIR = path.join(__dirname, '../../dist');
const SERVER_RENDERER_PATH = path.join(DIST_DIR, 'server.js');
const STATS_PATH = path.join(DIST_DIR, 'client-stats.json');

const sr = require('../../dist/server.js');
console.log('-----', sr);

let serverRenderer = function serverRenderer({ clientStats, serverStats, foo }) {
  return (req, res, next) => {
      res.status(200).send(`
      <!doctype html>
      <html>
      <head>
          <title>${foo}</title>
      </head>
      <body>
          <div id="root">${'test'}</div>
          <script src="/client.js"></script>
      </body>
      </html>
  `);
  };
};
let stats;

try {
  serverRenderer = require('../../dist/server.js');
  console.log('serverRenderer', serverRenderer);
} catch (ex) {
  throw new Error(
    `Server bundle not found at ${SERVER_RENDERER_PATH}. Try running \`npm run build\``
  );
}

try {
  stats = require(STATS_PATH);
} catch (ex) {
  throw new Error(
    `Client stats not found at ${STATS_PATH}. Try running \`npm run build\``
  );
}

Router.use(
  express.static(DIST_DIR, {
    maxAge: ms(process.env.BROWSER_CACHE || 0)
  })
);

Router.use(
  serverRenderer({
    clientStats: stats
  })
);


module.exports = Router;