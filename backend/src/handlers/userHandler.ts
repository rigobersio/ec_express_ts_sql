import { Request, Response } from 'express';
import { getUsers } from '../controllers/getUsersController';
import { getUserById } from '../controllers/getUserByIdController';
import { createUser } from '../controllers/createUserController';
import { updateUser } from '../controllers/updateUserController';
import { deleteUser } from '../controllers/deleteUserController';

export const handleGetUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = getUsers();
    res.send(result);
  } catch (error) {
    res.status(500).send('Error getting users');
  }
};

export const handleGetUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = getUserById(id);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error getting user by ID');
  }
};

export const handleCreateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const result = createUser(name, email);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error creating user');
  }
};

export const handleUpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const result = updateUser(id, name, email);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error updating user');
  }
};

export const handleDeleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = deleteUser(id);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
};
