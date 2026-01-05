import 'reflect-metadata';
import express from 'express';
import 'dotenv/config'
import { container } from './container/inversify.config';
import {Relatorio} from './controllers/relatoryController'

const app = express();

app.use(express.json())

const relatorioController = new Relatorio();

app.get('/relatorio',relatorioController.relatoryProcess)

export default app;