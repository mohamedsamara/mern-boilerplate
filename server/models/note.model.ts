import { Schema, model } from 'mongoose';

import { INote, NoteModelType } from '../types/note.types';

class NoteModel {
  private model: NoteModelType;

  constructor() {
    this.init();
  }

  private init() {
    const schema = new Schema({
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    });

    this.model = <NoteModelType>model<INote>('note', schema);
  }

  public get(): NoteModelType {
    return this.model;
  }
}

export default NoteModel;
