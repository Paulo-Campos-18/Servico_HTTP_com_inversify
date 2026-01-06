import 'reflect-metadata';
import 'dotenv/config';
import {createApp} from './app';
import { TYPES } from './types';
import { RelatorioController } from './controllers/relatoryController';
import {container} from './container/inversify.config'


const PORT = Number(process.env.APP_PORT);

const controller = container.get<RelatorioController>(TYPES.RelatoryController) ;
const app = createApp(controller);

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});

