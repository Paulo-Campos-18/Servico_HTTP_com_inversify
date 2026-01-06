import 'reflect-metadata';
import 'dotenv/config';
import {container} from './container/inversify.config'
import {createApp} from './app';
import { TYPES } from './types';
import { RelatorioController } from './controllers/relatoryController';

const PORT = Number(process.env.APP_PORT);
const controller = container.get<RelatorioController>(TYPES.RelatoryController) 
const app = createApp(controller)
app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});

