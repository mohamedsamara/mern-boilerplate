import * as express from 'express';
import { Container } from 'typedi';

import NotesController from '../../controllers/notes.controller';

const notesControllerInstance = Container.get(NotesController);

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

  private async get() {
    this.router.get('/', notesControllerInstance.getNotes);
  }

  private async getOne() {
    this.router.get('/:id', notesControllerInstance.getNote);
  }

  private async put() {
    this.router.put('/:id', notesControllerInstance.updateNote);
  }

  private async post() {
    this.router.post('/', notesControllerInstance.addNote);
  }

  private async delete() {
    this.router.delete('/:id', notesControllerInstance.deleteNote);
  }
}

export default NotesRoute;
