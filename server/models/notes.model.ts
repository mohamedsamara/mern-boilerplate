import { Schema, model } from 'mongoose';

import { INote, NoteModel } from '../types/notes.types';

class NotesModel {
  private model: NoteModel;

  constructor() {
    this.initSchema();
  }

  public initSchema() {
    const schema = new Schema({
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    });

    this.model = <NoteModel>model<INote>('notes', schema);
  }

  public getModel(): NoteModel {
    return this.model;
  }
}

export default NotesModel;
