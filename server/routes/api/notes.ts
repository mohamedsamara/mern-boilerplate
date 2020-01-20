import * as express from 'express';

import NotesController from '../../controllers/notes.controller';

class NotesRoute {
  public static path = '/notes';

  private router = express.Router();

  private constructor() {
    this.get();
    this.getOne();
    this.put();
    this.post();
    this.delete();
  }

  static get router() {
    const notesInstance = new NotesRoute();
    return notesInstance.router;
  }

  private get = async () => {
    this.router.get('/', NotesController.getNotes);
  };

  private getOne = async () => {
    this.router.get('/:id', NotesController.getNote);
  };

  private put = async () => {
    this.router.put('/', NotesController.updateNote);
  };

  private post = async () => {
    this.router.post('/', NotesController.addNote);
  };

  private delete = async () => {
    this.router.delete('/', NotesController.deleteNote);
  };
}

export default NotesRoute;
