import pool from '../../database/connection';

export const getUserById = async (id: string): Promise<any> => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  } finally {
    client.release();
  }
};