import { Request, Response } from 'express';
import { getUsers } from '../controllers/users/getUsersController';
import { getUserById } from '../controllers/users/getUserByIdController';
import { getUserByEmail } from '../controllers/users/getUserByEmailController';
import { createUser } from '../controllers/users/createUserController';
import { updateUser } from '../controllers/users/updateUserController';
import { deleteUser } from '../controllers/users/deleteUserController';

export const handleGetUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getUsers();
    res.status(200).json({
      message: "List users",
      result
    });
  } catch (error) {
    res.status(500).send('Error getting users');
  }
};

export const handleGetUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await getUserById(id);
    res.status(200).json({
      message: "Get user by ID",
      result
    });
  } catch (error) {
    res.status(500).send('Error getting user by ID');
  }
};

export const handleGetUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    const result = await getUserByEmail(email);
    res.status(200).json({
      message: "Get user by email",
      result
    });
  } catch (error) {
    res.status(500).send('Error getting user by email');
  }
};

export const handleCreateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, wallet } = req.body;
    const result = await createUser(name, email, password, role, wallet);
    res.status(201).json({
      message: "User created",
      result
    });
  } catch (error) {
    res.status(500).send('Error creating user');
  }
};

export const handleUpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, password, role, wallet } = req.body;
    const result = await updateUser(id, name, email, password, role, wallet);
    res.status(200).json({
      message: "User updated",
      result
    });
  } catch (error) {
    res.status(500).send('Error updating user');
  }
};

export const handleDeleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    res.status(200).json({
      message: "User deleted",
      result
    });
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
};
