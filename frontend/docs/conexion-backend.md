# Conexión del Frontend con el Backend en un Proyecto E-commerce

En este documento, detallaremos cómo conectar el frontend con el backend para traer información como el token de autenticación o datos de la base de datos.

## Configuración de Variables de Entorno

Primero, asegúrate de tener un archivo `.env` en el directorio `frontend` con la URL del backend:

```env
VITE_BACKEND_URL=http://localhost:3000
```

## Configuración de Axios

Vamos a utilizar Axios para realizar las solicitudes HTTP al backend. Instala Axios en el frontend usando pnpm:

```bash
pnpm add axios
```

Crea un archivo `axiosConfig.ts` en el directorio `src/api` para configurar Axios:

```typescript
// template-ecommerce/frontend/src/api/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default axiosInstance;
```

## Solicitud de Token de Autenticación

Para solicitar un token de autenticación, crea un archivo `authService.ts` en el directorio `src/services`:

```typescript
// /template-ecommerce/frontend/src/services/authService.ts
import axiosInstance from '../axiosConfig';

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
```

## Uso del Token en el Estado Global

Modifica el archivo `store.ts` para incluir el token en el estado global:

```typescript
// /template-ecommerce/frontend/src/store/store.ts
import create from 'zustand';

interface State {
  user: string | null;
  token: string | null;
  setUser: (user: string | null) => void;
  setToken: (token: string | null) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

export const useStore = create<State>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  products: [],
  setProducts: (products) => set({ products }),
}));
```

## Uso del Servicio de Autenticación en Componentes

Ahora puedes usar el servicio de autenticación en tus componentes. Aquí hay un ejemplo de cómo hacerlo en un componente de inicio de sesión:

```tsx
// /template-ecommerce/frontend/src/components/Login.tsx
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { login } from '../services/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);

  const handleLogin = async () => {
    try {
      const { user, token } = await login(email, password);
      setUser(user);
      setToken(token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
```

## Conclusión

Con esta configuración, el frontend puede conectarse al backend para traer información como el token de autenticación y datos de la base de datos. Puedes expandir esta configuración para incluir más servicios y manejar otros tipos de datos según sea necesario.

¡Feliz codificación!
