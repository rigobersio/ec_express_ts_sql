# Integración de Zustand en un Proyecto E-commerce con React y TypeScript

## ¿Qué es Zustand?

Zustand es una librería de gestión de estado para aplicaciones React. Fue creada por Jovi De Croock y es conocida por su simplicidad y eficiencia. A diferencia de otras librerías de gestión de estado como Redux, Zustand no requiere boilerplate adicional y es muy fácil de configurar y usar.

### Simulación de Autenticación

Vamos a simular que el backend nos envía un token de seguridad. Este token se utilizará para permitir el acceso a componentes protegidos en el frontend.

## Instalación de Zustand

Instala Zustand en el frontend usando pnpm:

```bash
pnpm add zustand
```

## Conectarse con el servidor Express

Para más detalles sobre cómo conectar el frontend con el backend, consulta el documento [Conexión del Frontend con el Backend](./conexion-backend.md).

### Configuración de Variables de Entorno

Asegúrate de tener un archivo `.env` en el directorio `frontend` con la URL del backend:

```env
VITE_BACKEND_URL=http://localhost:3000
```

### Configuración Inicial de Zustand

Crea un archivo para definir tu tienda (store). Por ejemplo, puedes crear un archivo `store.ts` en el directorio `src/store`.

### ¿Qué es una Interface?

En TypeScript, una interface es una forma de definir la estructura de un objeto. Nos permite especificar qué propiedades y métodos debe tener un objeto. Vamos a desglosar las interfaces `State` y `Product` utilizadas en nuestro ejemplo:

```typescript
// filepath: /c:/Users/costero/repos/un-momentum/template-ecommerce/frontend/src/store/store.ts
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
```

#### Interface `State`

La interface `State` define el estado de nuestra tienda. Contiene las siguientes propiedades y métodos:

- `user: string | null`: Esta propiedad almacena el nombre del usuario autenticado. Puede ser una cadena de texto (nombre del usuario) o `null` si no hay ningún usuario autenticado.
- `token: string | null`: Esta propiedad almacena el token de autenticación. Puede ser una cadena de texto (el token) o `null` si no hay ningún token disponible.
- `setUser: (user: string | null) => void`: Este método permite actualizar la propiedad `user`. Recibe un parámetro `user` que puede ser una cadena de texto o `null`. La palabra clave `void` indica que este método no devuelve ningún valor.
- `setToken: (token: string | null) => void`: Este método permite actualizar la propiedad `token`. Recibe un parámetro `token` que puede ser una cadena de texto o `null`. La palabra clave `void` indica que este método no devuelve ningún valor.
- `products: Product[]`: Esta propiedad almacena una lista de productos. Es un arreglo de objetos `Product`.
- `setProducts: (products: Product[]) => void`: Este método permite actualizar la lista de productos. Recibe un parámetro `products` que es un arreglo de objetos `Product`. La palabra clave `void` indica que este método no devuelve ningún valor.

#### Interface `Product`

La interface `Product` define la estructura de un producto. Contiene las siguientes propiedades:

- `id: number`: Esta propiedad almacena el identificador único del producto. Es un número.
- `name: string`: Esta propiedad almacena el nombre del producto. Es una cadena de texto.
- `price: number`: Esta propiedad almacena el precio del producto. Es un número.

### Creación de la Tienda con Zustand

Ahora vamos a crear la tienda utilizando Zustand. La tienda se define utilizando la función `create` de Zustand, que recibe una función que define el estado inicial y los métodos para actualizar el estado.

```typescript
export const useStore = create<State>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  products: [],
  setProducts: (products) => set({ products }),
}));
```

- `useStore`: Es el hook que utilizaremos en nuestros componentes para acceder y actualizar el estado.
- `set`: Es una función proporcionada por Zustand que permite actualizar el estado.

## Uso de la Tienda en Componentes

Ahora que tienes tu tienda configurada, puedes usarla en tus componentes. Aquí hay un ejemplo de cómo usar la tienda en un componente:

```tsx
// filepath: /c:/Users/costero/repos/un-momentum/template-ecommerce/frontend/src/components/ProductList.tsx
import React, { useEffect } from 'react';
import { useStore } from '../store/store';
import axios from 'axios';

const ProductList: React.FC = () => {
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
```

## Integración con Rutas Protegidas

Para manejar rutas protegidas, puedes usar Zustand para almacenar el estado del usuario y verificar si está autenticado. Aquí hay un ejemplo de cómo hacerlo:

```tsx
// filepath: /c:/Users/costero/repos/un-momentum/template-ecommerce/frontend/src/components/ProtectedRoute.tsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from '../store/store';

const ProtectedRoute: React.FC<{ component: React.FC; path: string }> = ({ component: Component, path }) => {
  const token = useStore((state) => state.token);

  return (
    <Route
      path={path}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
```

## Conclusión

Zustand es una herramienta poderosa y fácil de usar para la gestión de estado en aplicaciones React. Con esta guía, deberías poder integrar Zustand en tu proyecto de e-commerce y manejar el estado de manera eficiente. A medida que tu proyecto crezca, puedes expandir tu tienda para incluir más estados y acciones según sea necesario.

¡Feliz codificación!




