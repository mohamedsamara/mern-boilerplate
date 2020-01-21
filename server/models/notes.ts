// eslint-disable-next-line no-unused-vars
import { Document, Schema, Model, model } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface INote extends Document {
  title: string;
  content: string;
}

export type NoteModel = Model<INote> & INote;

class NotesModel {
  private model: any;

  public async initSchema() {
    const schema: Schema = new Schema({
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    });

    this.model = model<NoteModel>('notes', schema);
  }

  public getModel() {
    this.initSchema();
    return this.model;
  }
}

export default NotesModel;
