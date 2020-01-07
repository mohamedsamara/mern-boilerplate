import http from 'http';
import app from './app';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
let currentApp = app;

server.listen(PORT, () => {
  console.log(
    `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
  );
});

if (module.hot) {
  module.hot.accept('./app', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
