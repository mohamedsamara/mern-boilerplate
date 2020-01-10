import * as http from 'http';
import app from './app';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
  );
});

declare const module: any;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
