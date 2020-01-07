import { Router } from 'express';

import apiRoutes from './api';

const router = Router();

// book routes
router.use('/api', apiRoutes);

export default router;
