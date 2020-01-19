import App from './app';
import Server from './server';

/* eslint-disable */
const app = App.bootstrap().app;

Server.start(app);

declare const module: any;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => Server.close());
}
