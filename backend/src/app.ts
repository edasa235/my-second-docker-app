import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {useExpressServer} from 'routing-controllers';
import {errorHandler} from './middlewares/error.handler.js';
import {HealthController} from './controllers/health.controller.js';
import {PingController} from "./controllers/ping.controller.js";
import taskController from "./controllers/task.controller.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

useExpressServer(app, {
  routePrefix: '/api',
  controllers: [
    HealthController,
    PingController,
    taskController
  ],
  validation: true,
  classTransformer: true,
  defaultErrorHandler: false,
});

app.use(errorHandler);

export default app;
