import { Schema, model } from 'mongoose';

class NotesModel {
  public async initSchema() {
    const schema = new Schema(
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
      { timestamps: true },
    );

    model('notes', schema);
  }

  public async getInstance() {
    this.initSchema();
    return model('notes');
  }
}

export default NotesModel;
