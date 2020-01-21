// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { Container } from 'typedi';

import NotesService from '../services/notes.service';
import Responder from '../helpers/responder';

const ResponderInstance = Container.get(Responder);
const notesServiceInstance = Container.get(NotesService);

class NotesController {
  public async getNotes(req: Request, res: Response) {
    try {
      const notes = await notesServiceInstance.getNotes();

      if (notes.length > 0) {
        ResponderInstance.setSuccess(
          200,
          'notes are successfully retrieved',
          notes,
        );
      } else {
        ResponderInstance.setSuccess(200, 'No notes found');
      }
      return ResponderInstance.send(res);
    } catch (error) {
      ResponderInstance.setError(400, error);
      return ResponderInstance.send(res);
    }
  }

  public async getNote(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const note = await notesServiceInstance.getNote(id);

      if (!note) {
        ResponderInstance.setError(404, `cannot find note with the id ${id}`);
      } else {
        ResponderInstance.setSuccess(200, 'found note', note);
      }
      return ResponderInstance.send(res);
    } catch (error) {
      ResponderInstance.setError(404, error);
      return ResponderInstance.send(res);
    }
  }

  public async updateNote(req: Request, res: Response) {
    const newNote = req.body;
    const { id } = req.params;

    try {
      const updatedNote = await notesServiceInstance.updateNote(id, newNote);

      if (!updatedNote) {
        ResponderInstance.setError(404, `cannot find note with the id: ${id}`);
      } else {
        ResponderInstance.setSuccess(200, 'note updated', updatedNote);
      }
      return ResponderInstance.send(res);
    } catch (error) {
      ResponderInstance.setError(404, error);
      return ResponderInstance.send(res);
    }
  }

  public async addNote(req: Request, res: Response) {
    if (!req.body.title || !req.body.content) {
      ResponderInstance.setError(400, 'some details are missing');
      return ResponderInstance.send(res);
    }

    const newNote = req.body;
    try {
      const createdNote = notesServiceInstance.addNote(newNote);
      ResponderInstance.setSuccess(
        201,
        'note has been added successfully',
        createdNote,
      );
      return ResponderInstance.send(res);
    } catch (error) {
      ResponderInstance.setError(400, error.message);
      return ResponderInstance.send(res);
    }
  }

  public async deleteNote(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const noteToDelete = notesServiceInstance.deleteNote(id);

      if (noteToDelete) {
        ResponderInstance.setSuccess(200, 'note has been deleted successfully');
      } else {
        ResponderInstance.setError(
          404,
          `note with the id ${id} cannot be found`,
        );
      }
      return ResponderInstance.send(res);
    } catch (error) {
      ResponderInstance.setError(400, error);
      return ResponderInstance.send(res);
    }
  }
}

export default NotesController;
