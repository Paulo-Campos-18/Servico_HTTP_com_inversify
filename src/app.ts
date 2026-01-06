import express from 'express';
import { container } from './container/inversify.config';
import {Relatorio} from './controllers/relatoryController'
import { ReportService } from './services/ReportService';
import { TYPES } from './types';

const app = express();

app.use(express.json())

const relatorioController = container.get<ReportService>(TYPES.ReportService)

app.get('/relatorio/:n',relatorioController.relatoryProcess)

export default app;