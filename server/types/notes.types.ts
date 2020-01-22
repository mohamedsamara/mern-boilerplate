import { Document, Model } from 'mongoose';

export interface INote extends Document {
  _id: string;
  title: string;
  content: string;
}

export interface INoteModel {}

export type NoteModel = Model<INote> & INoteModel & INote;
