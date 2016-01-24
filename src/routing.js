'use strict';

import { Router } from 'express';
import Mraa from 'mraa';
import Gate from './gate';

const router = new Router;
const gate = new Gate;

router.get('/open', (req, res) => {
  gate.open();
  res.status(200).end();
});

router.get('/close', (req, res) => {
  gate.close();
  res.status(200).end();
});

export default router;
