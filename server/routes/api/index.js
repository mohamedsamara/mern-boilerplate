import { Router } from 'express';

import book from './book';

const router = Router();

// book routes
router.use('/book', book);

export default router;
