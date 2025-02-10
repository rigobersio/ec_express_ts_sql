# React + TypeScript + Vite
# Comercio Electrónico

## Expandiendo la configuración de ESLint

Si estás desarrollando una aplicación de producción, te recomendamos actualizar la configuración para habilitar reglas de lint con conocimiento de tipos:

- Configura la propiedad `parserOptions` de nivel superior de esta manera:

```js
export default tseslint.config({
  languageOptions: {
    // otras opciones...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Reemplaza `tseslint.configs.recommended` por `tseslint.configs.recommendedTypeChecked` o `tseslint.configs.strictTypeChecked`
- Opcionalmente agrega `...tseslint.configs.stylisticTypeChecked`
- Instala [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) y actualiza la configuración:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Establece la versión de react
  settings: { react: { version: '18.3' } },
  plugins: {
    // Agrega el plugin de react
    react,
  },
  rules: {
    // otras reglas...
    // Habilita sus reglas recomendadas
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Instructivo de Configuración y Maquetado Inicial

### Configuración de `main.tsx`

En el archivo `main.tsx`, se realizaron las siguientes configuraciones:

- Se comentó la importación de los estilos (`index.css`) para esta etapa inicial.
- Se agregó `ToastContainer` de `react-toastify` para manejar notificaciones.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
// import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {<ToastContainer 
    position="top-center"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />}
  </StrictMode>,
)
```

### Configuración de `App.tsx`

En el archivo `App.tsx`, se configuró `createBrowserRouter` y `RouterProvider` para manejar las rutas de la aplicación. Se agregaron rutas protegidas y se crearon componentes preliminares para cada ruta.

#### `createBrowserRouter` y `RouterProvider`

- `createBrowserRouter`: Esta función se utiliza para crear un enrutador basado en el navegador. Define las rutas de la aplicación y sus correspondientes componentes.
- `RouterProvider`: Este componente envuelve la aplicación y proporciona el enrutador creado por `createBrowserRouter` a toda la aplicación.

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './MainLayout';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from './pages/LogoutPage';
import GalleryPage from './pages/GalleryPage';
import ProfilePage from './pages/ProfilePage';
import PaymentGateway from './pages/PaymentGateway';
import PanelAdmin from './pages/PanelAdmin';
import ProtectedRoutes from './components/ProtectedRoutes';
import AdminRoute from './components/AdminRoute';
import Error from './components/Error';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
      errorElement: <Error />
    },
    {
      path: "/login",
      element: (
        <MainLayout>
          <LoginPage />
        </MainLayout>
      ),
      errorElement: <Error />
    },
    {
      path: "/register",
      element: (
        <MainLayout>
          <RegisterPage />
        </MainLayout>
      ),
      errorElement: <Error />
    },
    {
      path: "/gallery",
      element: (
        <MainLayout>
          <GalleryPage />
        </MainLayout>
      ),
      errorElement: <Error />
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/payment",
          element: (
            <MainLayout>
              <PaymentGateway />
            </MainLayout>
          ),
          errorElement: <Error />
        },
        {
          path: "/logout",
          element: (
            <MainLayout>
              <LogoutPage />
            </MainLayout>
          ),
          errorElement: <Error />
        },
        {
          path: "/profile",
          element: (
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          ),
          errorElement: <Error />
        },
        {
          element: <AdminRoute />,
          children: [
            {
              path: "/admin",
              element: (
                <MainLayout>
                  <PanelAdmin />
                </MainLayout>
              ),
              errorElement: <Error />
            }
          ]
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
```

### Maquetado Inicial

Se organizó el proyecto en subdirectorios dentro de `src`, dejando algunos componentes lógicos en `components` y otros componentes tipo vista en `pages`.

#### `MainLayout`

`MainLayout` es un componente que se utiliza para envolver las páginas principales y proporcionar una estructura común. Incluye elementos como la barra de navegación (`NavBar`) y el pie de página (`Footer`), y renderiza el contenido de la página a través de `children`.

```tsx
import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const MainLayout: React.FC = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
```

#### `ProtectedRoutes`

`ProtectedRoutes` es un componente que se utiliza para proteger ciertas rutas de la aplicación. Verifica si el usuario está autenticado antes de permitir el acceso a las rutas protegidas. En el futuro, este componente utilizará estados globales asociados a Zustand para manejar la autenticación.

```tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from '../store/store';

const ProtectedRoutes: React.FC = () => {
  const token = useStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
```

#### `AdminRoute`

`AdminRoute` es un componente que se utiliza para proteger la ruta del panel administrativo. Verifica si el usuario tiene el rol de administrador antes de permitir el acceso a la ruta protegida.

```tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../store/store';

const AdminRoute: React.FC = () => {
  const role = useStore((state) => state.role);

  return role === 'admin' ? <Outlet /> : <Navigate to="/profile" />;
};

export default AdminRoute;
```

### Creación de Favicon

En el directorio `public`, se creó un directorio `favicon` con favicones generados utilizando [favicon.io](https://favicon.io/) y se agregaron a `index.html`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SPA E-commerce</title>
  <link rel="icon" href="/favicon/favicon.ico">
  <!-- ...other links... -->
</head>
<body>
  <div id="root"></div>
  <!-- ...other scripts... -->
</body>
</html>
```

Este instructivo cubre las configuraciones y maquetado inicial del proyecto, proporcionando una base sólida para el desarrollo futuro.

---

## Funcionalidades

### Sistema de Rutas Protegidas

El sistema de rutas protegidas utiliza `Navigate`, `Outlet`, `createBrowserRouter` y `RouterProvider` de `react-router-dom` para gestionar la navegación y protección de rutas.

### Vista de Productos

La vista de productos incluye filtros por precio, marca y palabras clave. La paginación se implementa donde sea más eficiente (frontend o backend) y los resultados se persisten en `localStorage`.

### Carrito de Compras

El carrito de compras incluye persistencia de datos y está integrado con una pasarela de pagos para facilitar las transacciones.

---

## Últimas Actualizaciones

### Integración de Zustand

Se ha integrado Zustand para la gestión de estados globales en la aplicación. Zustand es una librería de gestión de estado para aplicaciones React, conocida por su simplicidad y eficiencia. La configuración inicial de Zustand se encuentra en el archivo `store.ts` en el directorio `src/store`.

### Conexión con el Backend

Se ha configurado Axios para realizar solicitudes HTTP al backend. Axios es una librería basada en promesas para realizar solicitudes HTTP en el navegador y Node.js. La configuración de Axios se encuentra en el archivo `axiosConfig.ts` en el directorio `src/api`.

### Ejemplo de Componente: `SimulateToken.tsx`

Se ha creado un componente `SimulateToken.tsx` que simula la autenticación de un usuario y genera un token. Utiliza Axios para realizar la solicitud de autenticación y Zustand para almacenar la información de autenticación.

```tsx
// filepath: /c:/Users/costero/repos/un-momentum/template-ecommerce/frontend/src/pages/SimulateToken.tsx
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