import * as http from 'http';

class Server {
  public server: any;

  public PORT: number | string = process.env.PORT || 3000;

  private readonly SERVER_MSG = `Listening on port ${this.PORT}. Visit http://localhost:${this.PORT}/ in your browser.`;

  public start(app: any): void {
    this.server = http.createServer(app);

    this.server.listen(this.PORT, () => {
      console.log(this.SERVER_MSG);
    });
  }

  public close(): void {
    this.server.close();
  }
}

export default Server;
