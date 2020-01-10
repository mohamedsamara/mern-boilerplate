import App from './app';
import Server from './server';

const app = new App().app;
const server = new Server();

server.start(app);

declare const module: any;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
