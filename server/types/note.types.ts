import { Document, Model } from 'mongoose';

import { IUser } from './user.types';

export interface INote extends Document {
  _id: string;
  title: string;
  content: string;
  user: IUser['_id'];
}

export interface INoteModel {}

export type NoteModelType = Model<INote> & INoteModel & INote;
