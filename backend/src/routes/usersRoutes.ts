import { Router } from 'express';
import { handleGetUsers, handleGetUserById, handleCreateUser, handleUpdateUser, handleDeleteUser } from '../handlers/userHandler';
import { authMiddleware } from '../middlewares/authMiddleware';

const usersRoutes = Router();

usersRoutes.get('/get', authMiddleware, handleGetUsers);
usersRoutes.get('/get/:id', authMiddleware, handleGetUserById);
usersRoutes.post('/post', authMiddleware, handleCreateUser);
usersRoutes.put('/put/:id', authMiddleware, handleUpdateUser);
usersRoutes.delete('/delete/:id', authMiddleware, handleDeleteUser);

export default usersRoutes;
