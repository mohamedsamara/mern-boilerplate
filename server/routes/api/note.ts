import * as express from 'express';
import { Container } from 'typedi';

import NoteController from '../../controllers/note.controller';
import { isAuth } from '../../middlewares/isAuth';

const noteController = Container.get(NoteController);

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
    this.router.get('/', isAuth, noteController.getNotes);
  }

  private async getOne() {
    this.router.get('/:id', isAuth, noteController.getNote);
  }

  private async put() {
    this.router.put('/:id', isAuth, noteController.updateNote);
  }

  private async post() {
    this.router.post('/', isAuth, noteController.addNote);
  }

  private async delete() {
    this.router.delete('/:id', isAuth, noteController.deleteNote);
  }
}

export default NoteRoute;
