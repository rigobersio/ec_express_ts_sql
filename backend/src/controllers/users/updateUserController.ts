import pool from '../../database/connection';

export const updateUser = async (id: string, name: string, email: string, password: string, role: string, wallet: number): Promise<any> => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      'UPDATE users SET name = $1, email = $2, password = $3, role = $4, wallet = $5 WHERE id = $6 RETURNING *',
      [name, email, password, role, wallet, id]
    );
    return res.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  } finally {
    client.release();
  }
};