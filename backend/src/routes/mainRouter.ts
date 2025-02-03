import { Router } from 'express';
import usersRoutes from './usersRoutes';

const mainRouter = Router();

mainRouter.use('/users', usersRoutes);

export default mainRouter;
