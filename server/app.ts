import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as logger from 'morgan';

// import routes from './routes';

class App {
  public app: express.Application;

  public static bootstrap() {
    return new App();
  }

  constructor() {
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }

  public api() {
    //empty for now
  }

  public config() {
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
      this.app.get('*', (req: express.Request, res: express.Response) =>
        res.status(200).send('Welcome to server APIs'),
      );
    }
  }

  private routes() {
    let router: express.Router;
    router = express.Router();

    // app.use(routes);
  }
}

export default App;
