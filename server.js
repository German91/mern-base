const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8000;

// Database
require('./database');

// Security
app.disable('x-powered-by');
app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());

// Config
app.use(logger('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(compression());
app.use(cors());

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('./webpack.config');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.use('/api/test', (req, res, next) => {
  res.status(200).json({ message: 'Hello Express' });
});

app.listen(PORT, (err) => {
  if (err) {
      console.error(err);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
