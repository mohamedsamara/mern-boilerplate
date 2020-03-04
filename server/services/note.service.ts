import { Container } from 'typedi';

import NoteModel from '../models/note.model';
import { INote } from '../types/note.types';

const noteModel = Container.get(NoteModel);
const note = noteModel.get();

class NoteService {
  public async getNotes(id: any) {
    try {
      return await note.find({ user: id });
    } catch (error) {
      throw error;
    }
  }

  public async getNote(id: any) {
    try {
      return await note.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async updateNote(id: any, newNote: any) {
    try {
      const noteToUpdate = await note.findById(id);

      if (noteToUpdate) {
        await noteToUpdate.updateOne(newNote);
        return newNote;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public async addNote(newNote: INote): Promise<INote> {
    try {
      return await note.create(newNote);
    } catch (error) {
      throw error;
    }
  }

  // Promise<INote>
  public async deleteNote(id: string) {
    try {
      const query = { _id: id };
      return await note.findByIdAndDelete(query);
    } catch (error) {
      throw error;
    }
  }
}

export default NoteService;
