import * as express from 'express';
import { Container } from 'typedi';

import NoteController from '../../controllers/note.controller';
import * as auth from '../../utils/auth';

const notesController = Container.get(NoteController);

class NoteRoute {
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
    const notesInstance = new NoteRoute();
    return notesInstance.router;
  }

  private async get() {
    this.router.get('/user/:id', auth.verifyRoute, notesController.getNotes);
  }

  private async getOne() {
    this.router.get('/:id', auth.verifyRoute, notesController.getNote);
  }

  private async put() {
    this.router.put('/:id', auth.verifyRoute, notesController.updateNote);
  }

  private async post() {
    this.router.post('/', auth.verifyRoute, notesController.addNote);
  }

  private async delete() {
    this.router.delete('/:id', auth.verifyRoute, notesController.deleteNote);
  }
}

export default NoteRoute;
