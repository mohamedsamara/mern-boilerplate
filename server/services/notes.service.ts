import NotesModel from '../models/notes';

const notesModelInstance = new NotesModel().getModel();

class NotesService {
  public async getNotes() {
    try {
      return await notesModelInstance.find();
    } catch (error) {
      throw error;
    }
  }

  public async getNote(id: any) {
    try {
      return await notesModelInstance.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async updateNote(id: any, newNote: any) {
    try {
      const noteToUpdate = await notesModelInstance.findById(id);

      if (noteToUpdate) {
        await notesModelInstance.updateOne(newNote);

        return newNote;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public async addNote(newNote: any) {
    try {
      return notesModelInstance.create(newNote);
    } catch (error) {
      throw error;
    }
  }

  public async deleteNote(id: any) {
    try {
      const noteToDelete = await notesModelInstance.findById(id);

      if (noteToDelete) {
        const deletedNote = await notesModelInstance.deleteOne({
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
