import { Container } from 'typedi';

import NoteModel from '../models/note.model';
import { INote } from '../types/note.types';

const noteModel = Container.get(NoteModel);
const note = noteModel.get();

class NoteService {
  public async getNotes(id: string): Promise<INote[]> {
    try {
      return await note.find({ user: id });
    } catch (error) {
      throw error;
    }
  }

  public async getNote(id: string): Promise<INote> {
    try {
      return await note.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async updateNote(id: string, newNote: INote): Promise<INote> {
    try {
      const query = { _id: id };
      const options = { new: true };

      return await note.findByIdAndUpdate(query, newNote, options);
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

  public async deleteNote(id: string): Promise<INote> {
    try {
      const query = { _id: id };
      return await note.findByIdAndDelete(query);
    } catch (error) {
      throw error;
    }
  }
}

export default NoteService;
