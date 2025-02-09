import React, { useState } from 'react';
import { getUsers } from '../api/auth';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    wallet: number;
}

const PanelAdmin: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        } catch (err) {
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Panel Administrativo</h1>
            <button onClick={handleFetchUsers}>Ver Usuarios</button>
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email}) - Rol: {user.role} - Saldo: ${user.wallet}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PanelAdmin;

