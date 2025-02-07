import pool from '../../database/connection';

export const deleteUser = async (id: string): Promise<any> => {
  const client = await pool.connect();
  try {
    const res = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  } finally {
    client.release();
  }
};
