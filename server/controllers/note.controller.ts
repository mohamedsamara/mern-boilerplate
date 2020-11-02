import { Request, Response } from 'express';
import { Container } from 'typedi';

import NoteService from '../services/note.service';
import Responder from '../helpers/responder';

const noteService = Container.get(NoteService);
const responder = Container.get(Responder);

class NoteController {
  public getNotes = async (req: Request, res: Response) => {
    const { id }: any = req.payload;

    try {
      const notes = await noteService.getNotes(id);

      if (notes.length > 0) {
        responder.success(200, null, notes);
      } else {
        responder.success(200, 'No notes found');
      }
      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  };

  public getNote = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const note = await noteService.getNote(id);

      if (!note) {
        responder.error(404, `cannot find note with the id ${id}`);
      } else {
        responder.success(200, null, note);
      }
      return responder.send(res);
    } catch (error) {
      responder.error(404, error);
      return responder.send(res);
    }
  };

  public updateNote = async (req: Request, res: Response) => {
    const newNote = req.body;
    const { id } = req.params;

    try {
      const updatedNote = await noteService.updateNote(id, newNote);

      if (updatedNote) {
        responder.success(200, 'note updated', updatedNote);
      }

      return responder.send(res);
    } catch (error) {
      responder.error(404, error);
      return responder.send(res);
    }
  };

  public addNote = async (req: Request, res: Response) => {
    const { id }: any = req.payload;
    const newNote = req.body;
    newNote.user = id;

    if (!newNote.title || !newNote.content) {
      responder.error(400, 'some details are missing');
      return responder.send(res);
    }

    try {
      const createdNote = await noteService.addNote(newNote);
      responder.success(201, 'note added', createdNote);
      return responder.send(res);
    } catch (error) {
      responder.error(400, error.message);
      return responder.send(res);
    }
  };

  public deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deletedNote = await noteService.deleteNote(id);

      if (deletedNote) {
        responder.success(200, 'note deleted');
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  };
}

export default NoteController;
