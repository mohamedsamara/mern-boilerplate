import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as passport from 'passport';

import BaseRoute from './routes';
import PassportConfig from './config/passport';

class App {
  public app: express.Application;

  public mongoURI: string = process.env.MONGO_URI;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();

    // express middleware
    this.middleware();

    // add routes
    this.routes();

    // configuration
    this.config();

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

  private middleware(): void {
    this.app.use(express.static(path.resolve(__dirname, '../client')));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    const passportInstance = new PassportConfig(passport);
    passportInstance.init();
  }

  private config(): void {
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
