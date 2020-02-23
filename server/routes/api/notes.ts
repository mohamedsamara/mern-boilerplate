import * as express from 'express';
import { Container } from 'typedi';

import NotesController from '../../controllers/notes.controller';
import * as auth from '../../utils/auth';

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
    this.router.get(
      '/user/:id',
      auth.verifyRoute,
      notesControllerInstance.getNotes,
    );
  }

  private async getOne() {
    this.router.get('/:id', auth.verifyRoute, notesControllerInstance.getNote);
  }

  private async put() {
    this.router.put(
      '/:id',
      auth.verifyRoute,
      notesControllerInstance.updateNote,
    );
  }

  private async post() {
    this.router.post('/', auth.verifyRoute, notesControllerInstance.addNote);
  }

  private async delete() {
    this.router.delete(
      '/:id',
      auth.verifyRoute,
      notesControllerInstance.deleteNote,
    );
  }
}

export default NotesRoute;
