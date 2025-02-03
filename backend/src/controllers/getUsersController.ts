import { usersDatabase } from '../database/usersDatabase';

export const getUsers = (): typeof usersDatabase => {
  // Retorna todos los usuarios simulados
  return usersDatabase;
};