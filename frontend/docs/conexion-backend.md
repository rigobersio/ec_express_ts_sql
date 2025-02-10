# Conexión del Frontend con el Backend en un Proyecto E-commerce

## Configuración de Variables de Entorno

Primero, asegúrate de tener un archivo `.env` en el directorio `frontend` con la URL del backend:

```env
VITE_BACKEND_URL=http://localhost:3000
```

## Configuración de Axios

Vamos a utilizar Axios para realizar las solicitudes HTTP al backend. Axios es una librería basada en promesas para realizar solicitudes HTTP en el navegador y Node.js. Es muy popular debido a su simplicidad y flexibilidad.

### Instalación de Axios

Instala Axios en el frontend usando pnpm:

```bash
pnpm add axios
```

### Configuración de Axios

Crea un archivo `axiosConfig.ts` en el directorio `src/api` para configurar Axios:

```typescript
// /template-ecommerce/frontend/src/api/axiosConfig.ts
import axios from 'axios';

// Definimos la URL base para las solicitudes HTTP. Esta URL se obtiene de las variables de entorno.
const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Creamos una instancia de Axios con la configuración inicial.
const instanceAxios = axios.create({
  baseURL: baseURL, // Establecemos la URL base para todas las solicitudes HTTP.
  withCredentials: true, // Permitimos el envío de cookies y credenciales en las solicitudes.
});

// Exportamos la instancia de Axios para que pueda ser utilizada en otros archivos.
export default instanceAxios;
```

### Explicación Detallada del Archivo `axiosConfig.ts`

1. **Importaciones**:
   - `import axios from 'axios';`: Importamos la librería Axios para poder utilizarla en nuestro archivo.

2. **Definición de la URL Base**:
   - `const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';`: Definimos la URL base para las solicitudes HTTP. Esta URL se obtiene de las variables de entorno (`VITE_BACKEND_URL`). Si no se encuentra definida, utilizamos `http://localhost:3000` como valor por defecto.

3. **Creación de la Instancia de Axios**:
   - `const instanceAxios = axios.create({ ... });`: Creamos una instancia de Axios con la configuración inicial. Esta configuración incluye la URL base (`baseURL`) y la opción `withCredentials` para permitir el envío de cookies y credenciales en las solicitudes.

4. **Exportación de la Instancia de Axios**:
   - `export default instanceAxios;`: Exportamos la instancia de Axios para que pueda ser utilizada en otros archivos del proyecto.

## Solicitud de Token de Autenticación

Para solicitar un token de autenticación, crea un archivo `auth.ts` en el directorio `src/api`:

```typescript
// /template-ecommerce/frontend/src/api/auth.ts
import instanceAxios from './axiosConfig';

// Función para obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await instanceAxios.get('/users/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Función para obtener un usuario por su ID
export const getUserById = async (id: string) => {
  try {
    const response = await instanceAxios.get(`/users/get/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

// Función para obtener un usuario por su correo electrónico
export const getUserByEmail = async (email: string) => {
  try {
    const response = await instanceAxios.get(`/users/get/email/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw error;
  }
};

// Función para crear un nuevo usuario
export const createUser = async (userData: any) => {
  try {
    const response = await instanceAxios.post('/users/post', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Función para actualizar un usuario existente
export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await instanceAxios.put(`/users/put/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
};

// Función para eliminar un usuario
export const deleteUser = async (id: string) => {
  try {
    const response = await instanceAxios.delete(`/users/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};
```

### Explicación Detallada del Archivo `auth.ts`

1. **Importaciones**:
   - `import instanceAxios from './axiosConfig';`: Importamos la instancia de Axios configurada en el archivo `axiosConfig.ts`.

2. **Funciones para Realizar Solicitudes HTTP**:
   - `getUsers`: Función asincrónica para obtener todos los usuarios. Realiza una solicitud GET a la ruta `/users/get` y devuelve los datos de la respuesta.
   - `getUserById`: Función asincrónica para obtener un usuario por su ID. Realiza una solicitud GET a la ruta `/users/get/:id` y devuelve los datos de la respuesta.
   - `getUserByEmail`: Función asincrónica para obtener un usuario por su correo electrónico. Realiza una solicitud GET a la ruta `/users/get/email/:email` y devuelve los datos de la respuesta.
   - `createUser`: Función asincrónica para crear un nuevo usuario. Realiza una solicitud POST a la ruta `/users/post` con los datos del usuario y devuelve los datos de la respuesta.
   - `updateUser`: Función asincrónica para actualizar un usuario existente. Realiza una solicitud PUT a la ruta `/users/put/:id` con los datos del usuario y devuelve los datos de la respuesta.
   - `deleteUser`: Función asincrónica para eliminar un usuario. Realiza una solicitud DELETE a la ruta `/users/delete/:id` y devuelve los datos de la respuesta.

3. **Manejo de Errores**:
   - En cada función, utilizamos un bloque `try...catch` para manejar posibles errores durante la solicitud HTTP. Si ocurre un error, lo registramos en la consola y lanzamos una excepción.

## Uso del Servicio de Autenticación en Componentes

Ahora puedes usar el servicio de autenticación en tus componentes. Aquí hay un ejemplo de cómo hacerlo en un componente de inicio de sesión:

### Ejemplo: `SimulateToken.tsx`

Este componente simula la autenticación de un usuario y genera un token. Utiliza Axios para realizar la solicitud de autenticación y Zustand para almacenar la información de autenticación.

```tsx
// /template-ecommerce/frontend/src/pages/SimulateToken.tsx
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { getUserByEmail } from '../api/auth';
import { Link } from 'react-router-dom';

const SimulateToken: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const setRole = useStore((state) => state.setRole);
  const role = useStore((state) => state.role);

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
```

### Explicación del Componente `SimulateToken.tsx`

1. **Importaciones**:
   - `import React, { useState } from 'react';`: Importamos React y el hook `useState` para manejar el estado local del componente.
   - `import { useStore } from '../store/store';`: Importamos el hook `useStore` para acceder y actualizar el estado global.
   - `import { getUserByEmail } from '../api/auth';`: Importamos la función `getUserByEmail` para consultar al backend por un usuario mediante su correo electrónico.
   - `import { Link } from 'react-router-dom';`: Importamos el componente `Link` de `react-router-dom` para la navegación entre rutas.

2. **Estado Local**:
   - `const [email, setEmail] = useState<string>('');`: Estado local para almacenar el correo electrónico ingresado por el usuario.
   - `const [password, setPassword] = useState<string>('');`: Estado local para almacenar la contraseña ingresada por el usuario.
   - `const [error, setError] = useState<string | null>(null);`: Estado local para almacenar mensajes de error.

3. **Acceso al Estado Global**:
   - `const setUser = useStore((state) => state.setUser);`: Aquí estamos declarando una constante `setUser` y asignándole el valor retornado por la función `useStore`. La función `useStore` toma una función como argumento `(state) => state.setUser` y devuelve el método `setUser` del estado global. `state` es el estado actual de la tienda (store) y `state.setUser` es el método definido en `createState` para actualizar la propiedad `user`.
   - `const setToken = useStore((state) => state.setToken);`: Similar a `setUser`, esta línea extrae el método `setToken` del estado global.
   - `const setRole = useStore((state) => state.setRole);`: Similar a `setUser`, esta línea extrae el método `setRole` del estado global.
   - `const role = useStore((state) => state.role);`: Similar a `setUser`, esta línea extrae la propiedad `role` del estado global.

4. **Manejo del Login**:
   - `const handleLogin = async () => { ... };`: Función asincrónica que maneja el proceso de autenticación.
   - `const response = await getUserByEmail(email);`: Consultamos al backend por un usuario mediante su correo electrónico.
   - `if (response.result === 'No user found') { ... }`: Verificamos si el usuario no fue encontrado y mostramos un mensaje de error.
   - `else if (response.result && response.result.password === password) { ... }`: Verificamos si la contraseña ingresada coincide con la del usuario y simulamos un token de autenticación.
   - `setUser(user.name); setToken(token); setRole(user.role);`: Actualizamos el estado global con el nombre del usuario, el token y el rol.

5. **Renderizado del Componente**:
   - Utilizamos TailwindCSS para los estilos del componente.
   - Mostramos un formulario para ingresar el correo electrónico y la contraseña.
   - Mostramos enlaces para navegar a `/profile` y `/admin` según el rol del usuario.
   - Mostramos la información de dos usuarios de prueba en la parte baja del contenedor.
