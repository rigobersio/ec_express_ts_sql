import pool from '../../database/connection';

export const getUsers = async (): Promise<any[]> => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users');
    return res.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  } finally {
    client.release();
  }
};