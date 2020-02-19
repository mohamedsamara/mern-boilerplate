import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { Container } from 'typedi';

import Responder from './helpers/responder';
import BaseRoute from './routes';
import PassportConfig from './config/passport';
import config from './config/keys';

const responderInstance = Container.get(Responder);

class App {
  public app: express.Application;

  public mongoURI: string = config.database.url;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();

    // add database
    this.database();

    // express middleware
    this.middleware();

    // add routes
    this.routes();

    // configuration
    this.config();

    // configure cors
    this.setCors();
  }

  private database(): void {
    mongoose
      .connect(this.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
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

  private setCors() {
    const whitelist = ['http://localhost:5000', 'http://localhost:3000'];

    const options: cors.CorsOptions = {
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      preflightContinue: false,
    };

    this.app.use(cors(options));
    this.app.options('*', cors());
  }

  private middleware(): void {
    this.app.use(express.static(path.resolve(__dirname, '../client')));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(cookieParser());
    this.app.disable('x-powered-by');

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
      this.app.get('*', (req: express.Request, res: express.Response) => {
        responderInstance.setError(
          422,
          'Your request could not be processed. Please try again.',
        );
        responderInstance.send(res);
      });
    }
  }

  private routes(): void {
    this.app.use(BaseRoute.path, BaseRoute.router);
  }
}

export default App;
