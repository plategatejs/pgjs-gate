'use strict';

import Mraa from 'mraa';
import config from 'config';
import logger from './logger';

const Gate = function () {
  const { port, time } = config.get('gate');

  Mraa.init();

  const pin = new Mraa.Gpio(port);
  pin.dir(Mraa.DIR_OUT);

  let timeout;

  this.open = () => {
    logger.info('requesting gate open');
    pin.write(1);

    clearTimeout(timeout);
    timeout = setTimeout(this.close, time);
  };

  this.close = () => {
    logger.info('requesting gate close');
    pin.write(0);
  };
};

export default Gate;
