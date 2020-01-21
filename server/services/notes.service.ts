// import { Container } from 'typedi';

import NotesModel from '../models/notes';

const NotesModelInstance = new NotesModel().getModel();

class NotesService {
  public async getNotes() {
    try {
      return await NotesModelInstance.find();
    } catch (error) {
      throw error;
    }
  }

  public async getNote(id: any) {
    try {
      return await NotesModelInstance.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async updateNote(id: any, newNote: any) {
    try {
      const noteToUpdate = await NotesModelInstance.findById(id);

      if (noteToUpdate) {
        await NotesModelInstance.updateOne(newNote);

        return newNote;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public async addNote(newNote: any) {
    try {
      return NotesModelInstance.create(newNote);
    } catch (error) {
      throw error;
    }
  }

  public async deleteNote(id: any) {
    try {
      const noteToDelete = await NotesModelInstance.findById(id);

      if (noteToDelete) {
        const deletedNote = await NotesModelInstance.deleteOne({
          _id: id,
        });
        return deletedNote;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default NotesService;
