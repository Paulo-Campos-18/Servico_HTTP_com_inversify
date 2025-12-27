import express from 'express';
import {Relatorio} from './controllers/relatoryController'

const app = express();

app.use(express.json())

const relatorioController = new Relatorio();

app.get('/relatorio',relatorioController.relatoryProcess)

export default app;