import * as express from 'express';

class NotesRoute {
  public static path = '/notes';

  private router = express.Router();

  private constructor() {
    this.router.get('/', this.get);
  }

  static get router() {
    const notesInstance = new NotesRoute();
    return notesInstance.router;
  }

  private get = async (req: express.Request, res: express.Response) => {
    const notes = [
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' },
    ];

    res.status(200).json({ message: 'Welcome to Notes Api!', data: notes });
  };
}

export default NotesRoute;
