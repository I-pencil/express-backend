import express from 'express';
import bodyParser from 'body-parser';
var logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

require('env2')('./.env');
const config = require('./config');


function run() {
  app.listen(config.PORT, '0.0.0.0', (err) => {
    if (err) {
      console.log('启动服务失败 >>> ', err);
      return;
    }
    console.log('Listening at http://localhost:', config.PORT);
  });
}

run()
