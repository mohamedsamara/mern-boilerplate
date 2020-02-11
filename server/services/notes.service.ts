import { Container } from 'typedi';

import NotesModel from '../models/notes.model';

const notesModelInstance = Container.get(NotesModel);
const notesModel = notesModelInstance.getModel();

class NotesService {
  public async getNotes() {
    try {
      return await notesModel.find();
    } catch (error) {
      throw error;
    }
  }

  public async getNote(id: any) {
    try {
      return await notesModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async updateNote(id: any, newNote: any) {
    try {
      const noteToUpdate = await notesModel.findById(id);

      if (noteToUpdate) {
        await noteToUpdate.updateOne(newNote);

        return newNote;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public async addNote(newNote: any) {
    try {
      return notesModel.create(newNote);
    } catch (error) {
      throw error;
    }
  }

  public async deleteNote(id: any) {
    try {
      const noteToDelete = await notesModel.findById(id);

      if (noteToDelete) {
        const deletedNote = await notesModel.deleteOne({
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
