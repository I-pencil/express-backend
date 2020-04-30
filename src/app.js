
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import createError from 'http-errors';
var logger = require('morgan');

import { Lifetime, asClass } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-express';
import container from './container';

import initialize from './initialize';

import { baseMiddleware } from './middleware/base';

import config from './config';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(scopePerRequest(container));
app.use(baseMiddleware(app));

app.use(
  '/api',
  loadControllers('api/*Api.js', {
    cwd: __dirname,
    lifetime: Lifetime.SINGLETON,
  })
);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});


function run() {

  initialize();

  container.loadModules(['./services/*Service.js', './daos/*Dao.js'], {
    formatName: 'camelCase',
    register: asClass,
    cwd: path.resolve(__dirname),
  });
  app.listen(config.PORT, '0.0.0.0', (err) => {
    if (err) {
      console.log('启动服务失败 >>> ', err);
      return;
    }
    console.log('Listening at http://localhost:', config.PORT);
  });
}

run()
