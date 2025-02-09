import React, { useState } from 'react';
import { useStore } from '../store/store';
import { getUserByEmail } from '../api/auth';
import { Link } from 'react-router-dom';

const SimulateToken: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const setRole = useStore((state) => state.setRole);
  const role = useStore((state) => state.role);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await getUserByEmail(email);
      if (response.result === 'No user found') {
        setError('Usuario no encontrado');
      } else if (response.result && response.result.password === password) {
        const user = response.result;
        console.log(user);
        const token = 'simulated-token'; // Simulamos un token
        setUser(user.name);
        setToken(token);
        setRole(user.role);
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al autenticar');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Simular Token</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo Electrónico"
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleLogin}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Iniciar Sesión
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        {role === "cliente" && (
          <Link to="/profile" className="text-blue-500 font-bold">
            Ir a Perfil
          </Link>
        )}
        {role === 'admin' && (
          <Link to="/admin" className="text-blue-500 font-bold ml-4">
            Ir a Admin
          </Link>
        )}
      </div>
      <div className="mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Usuarios de Prueba</h2>
        <div className="mb-4">
          <p><strong>Email:</strong> adminalfa@adminalfa.com</p>
          <p><strong>Password:</strong> admin1234</p>
          <p><strong>Role:</strong> admin</p>
        </div>
        <div>
          <p><strong>Email:</strong> maria.lopez@example.com</p>
          <p><strong>Password:</strong> password456</p>
          <p><strong>Role:</strong> cliente</p>
        </div>
      </div>
    </div>
  );
};

export default SimulateToken;
