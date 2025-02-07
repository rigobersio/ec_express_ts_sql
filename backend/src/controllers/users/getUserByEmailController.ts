import pool from '../../database/connection';

export const getUserByEmail = async (email: string): Promise<any> => {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        //console.log("res.rows", res.rows);
        return res.rows.length > 0 ? res.rows[0] : "No user found";
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    } finally {
        client.release();
    }
};
