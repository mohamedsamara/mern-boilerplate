import * as http from 'http';

class Server {
  public static server: http.Server;

  public static PORT: number = Number(process.env.PORT) || 3000;

  public static start(app: any): void {
    this.server = http.createServer(app);

    this.server.listen(this.PORT, () => {
      console.log(
        `Listening on port ${this.PORT}. Visit http://localhost:${this.PORT}/ in your browser.`,
      );
    });
  }

  public static close(): void {
    this.server.close();
  }
}

export default Server;
