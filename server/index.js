import express from 'express';
import {
  Request,
  Response
} from 'express';

const app = express();

const {
  PORT = 3000,
  NODE_ENV = 'development'
} = process.env;

const isDev = NODE_ENV == 'development';

if (!isDev) {
  console.log('staticMiddleware');
  const staticMiddleware = require('./middleware/static.middleware').default;
  app.use(staticMiddleware);
} else {
  const webpackMiddleWare = require('./middleware/webpack.middleware').default;
  console.log('webpackMiddleWare', webpackMiddleWare);
  app.use(webpackMiddleWare);
}

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
});