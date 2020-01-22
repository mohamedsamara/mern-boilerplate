import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';

import BaseRoute from './routes';

class App {
  public app: express.Application;

  public mongoURI: string = process.env.MONGO_URI;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();

    // configuration & middlewares
    this.config();

    // add routes
    this.routes();

    // add database
    this.database();
  }

  private database(): void {
    mongoose
      .connect(this.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('MongoDB is connected!');
      })
      .catch(err => {
        console.log(
          `MongoDB connection error ${err}. Please make sure MongoDB is running.`,
        );
      });
  }

  private config(): void {
    this.app.use(express.static(path.resolve(__dirname, '../client')));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());

    if (process.env.NODE_ENV === 'production') {
      this.app.use(compression());
      this.app.get('*', (req: express.Request, res: express.Response) => {
        res.sendFile(path.resolve(__dirname, '../client/index.html'));
      });
    } else {
      this.app.use(logger('dev'));
    }
  }

  private routes(): void {
    this.app.use(BaseRoute.path, BaseRoute.router);
  }
}

export default App;
