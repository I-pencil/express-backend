import { asValue } from 'awilix';

export function baseMiddleware(app) {
  return (req, res, next) => {
    res.success = (data, error = null, message = '成功', status = 0) => {
      res.json({
        error,
        message,
        data,
        status,
        success: true,
        timestamp: new Date(),
        type: 'SUCCRSS',
      });
    };
    res.fail = (data, error = null, message = '失败', status = 0) => {
      res.json({
        error,
        message,
        data,
        status,
        success: false,
        timestamp: new Date(),
        type: 'FAIL',
      });
    };

    req.app = app;
    req.container = req.container.createScope();
    req.container.register({
      request: asValue(req),
      response: asValue(res),
    });
    next();
  };
}
