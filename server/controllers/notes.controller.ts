// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

class NotesController {
  public static async getNotes(req: Request, res: Response) {
    const notes = [
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' },
    ];

    res.status(200).json({ message: 'all notes', data: notes });
  }

  public static async getNote(req: Request, res: Response) {
    const notes = [{ id: 1, name: 'test1' }];

    res.status(200).json({ message: 'one note', data: notes });
  }

  public static async addNote(req: Request, res: Response) {
    res.status(200).json({ message: 'added' });
  }

  public static async updateNote(req: Request, res: Response) {
    const notes = [
      { id: 1, name: 'test1' },
      { id: 2, name: 'tefffffst2' },
    ];

    res.status(200).json({ message: 'updated!', data: notes });
  }

  public static async deleteNote(req: Request, res: Response) {
    res.status(200).json({ message: 'Deleted' });
  }
}

export default NotesController;
