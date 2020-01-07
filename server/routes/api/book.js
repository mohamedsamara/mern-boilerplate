import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const books = [
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' },
    { id: 2, name: 'test2' },
    { id: 2, name: 'test2' },
    { id: 2, name: 'test2' },
    { id: 2, name: 'test2' },
    { id: 2, name: 'test2' },
    { id: 2, name: 'test2' },
  ];

  res.json(books);
});

export default router;
