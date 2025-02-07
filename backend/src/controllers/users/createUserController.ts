import pool from '../../database/connection';

export const createUser = async (name: string, email: string, password: string, role: string, wallet: number): Promise<any> => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      'INSERT INTO users (name, email, password, role, wallet) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, password, role, wallet]
    );
    return res.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  } finally {
    client.release();
  }
};
