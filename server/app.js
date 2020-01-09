import path from 'path';
import express from 'express';
import cors from 'cors';
import compression from 'compression';

import routes from './routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });
}

app.get('*', (req, res) => res.status(200).send('Welcome to server APIs'));

export default app;
