import express, { Request, Response, NextFunction, Application } from 'express';
import config from 'config';
import log from './logger';
import * as dotenv from 'dotenv';
import connect from './db/connect';

dotenv.config();
const port = (process.env.PORT as any) || (config.get('port') as number);
const host = config.get('host') as string;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, (): void => {
  log.info(`Server listening at http://${host}:${port}`);
  connect();
});
