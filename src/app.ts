import express from 'express';

import { RelatorioController } from './controllers/relatoryController';

export function createApp(controller: RelatorioController) {
  const app = express();

  app.use(express.json());

  app.get('/relatorio/:n', controller.relatoryProcess);

  return app;
}