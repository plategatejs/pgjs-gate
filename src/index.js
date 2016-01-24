'use strict';

import Express from 'express';
import config from 'config';
import logger from './logger';
import routing from './routing';
import {
  notFoundHandler,
  internalServerErrorHandler
} from './middleware';

export default () => {
  const app = new Express;
  const port = config.get('http.port');

  app
    .disable('x-powered-by')
    .use(routing)
    .use(internalServerErrorHandler)
    .use(notFoundHandler)
    .listen(port, () => logger.info(`server up on port ${port}`));
};
