import { Document, Model } from 'mongoose';

export interface INote extends Document {
  id: string;
  title: string;
  content: string;
}

export interface INoteModel {}

export type NoteModel = Model<INote> & INoteModel & INote;
