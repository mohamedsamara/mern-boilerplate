import * as express from 'express';
import { Container } from 'typedi';

import NotesController from '../../controllers/notes.controller';

const NotesControllerInstance = Container.get(NotesController);

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
    this.router.get('/', NotesControllerInstance.getNotes);
  };

  private getOne = async () => {
    this.router.get('/:id', NotesControllerInstance.getNote);
  };

  private put = async () => {
    this.router.put('/', NotesControllerInstance.updateNote);
  };

  private post = async () => {
    this.router.post('/', NotesControllerInstance.addNote);
  };

  private delete = async () => {
    this.router.delete('/', NotesControllerInstance.deleteNote);
  };
}

export default NotesRoute;
