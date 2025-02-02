// tengo que actualizar esto

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
import ProtectedRoutes from './components/ProtectedRoutes';
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
// import valor global de autenticación 

const ProtectedRoutes: React.FC = () => {
  const isAuthenticated: boolean = true; // ajustar esto para que sea una variable global

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
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