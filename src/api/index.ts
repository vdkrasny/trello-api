import { Router } from 'express';

import authRoutes from './routes/authRoutes';
import boardRoutes from './routes/boardRoutes';
import cardsRoutes from './routes/cardRoutes';
import middlewares from './middlewares';

const router = Router();

router.use(middlewares.requestDetails);
router.use(middlewares.logActivity);
router.use('/auth', authRoutes);
router.use(middlewares.checkAuthentication);
router.use('/boards', boardRoutes);
router.use('/cards', cardsRoutes);
router.use(middlewares.notFound);
router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);

export default router;
