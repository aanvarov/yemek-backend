import express, { Express } from 'express';
import config from 'config';
import log from './logger';
import * as dotenv from 'dotenv';
import connect from './db/connect';
import routes from './routes';
import { deserializeUser } from './middleware';

dotenv.config();
const port = (process.env.PORT as any) || (config.get('port') as number);
const host = config.get('host') as string;

const app: Express = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, (): void => {
  log.info(`Server listening at http://${host}:${port}`);
  connect();
  routes(app);
});
