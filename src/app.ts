import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { configDayJS } from './config/dayjs.config';

configDayJS();

const app = express();

app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Routes

// when a random route is inputed
app.get('*', (req, res) => {
  res.statusCode = 200;
  res.end('You are looking at the twitter apis');
});

export default app;
