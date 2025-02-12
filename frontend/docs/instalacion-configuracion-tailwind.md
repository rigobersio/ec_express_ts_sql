# Instalación y Configuración de TailwindCSS 4 en React 18 con Vite y TypeScript

En este tutorial, aprenderás a instalar y configurar TailwindCSS 4 en un proyecto de React 18 utilizando Vite y TypeScript. También incluiremos los plugins Typography y TailwindCSS Animated.

## Requisitos

- Node.js
- PNPM (o npm/yarn)
- Vite
- React 18
- TypeScript

## Paso 1: Crear un Nuevo Proyecto con Vite

Primero, crea un nuevo proyecto de React con Vite utilizando el siguiente comando:

```bash
pnpm create vite my-project --template react-ts
```

Navega al directorio del proyecto:

```bash
cd my-project
```

## Paso 2: Instalar TailwindCSS y sus Dependencias

### ¿Qué es TailwindCSS?

TailwindCSS es un framework CSS de utilidad que permite crear diseños personalizados directamente en el HTML. En lugar de escribir CSS personalizado, puedes usar clases de utilidad predefinidas para aplicar estilos.

### ¿Qué es PostCSS?

PostCSS es una herramienta para transformar CSS con plugins de JavaScript. Estos plugins pueden analizar y modificar el CSS, agregar compatibilidad con navegadores antiguos, y mucho más.

### ¿Qué es Autoprefixer?

Autoprefixer es un plugin de PostCSS que agrega automáticamente prefijos específicos del navegador a las propiedades CSS, asegurando la compatibilidad con diferentes navegadores.

Instala TailwindCSS y sus dependencias utilizando PNPM:

```bash
pnpm install -D tailwindcss @tailwindcss/vite postcss autoprefixer
```

Inicializa TailwindCSS:

```bash
npx tailwindcss init -p
```

## Paso 3: Configurar TailwindCSS

Abre el archivo `tailwind.config.js` y configura TailwindCSS para que procese los archivos de tu proyecto:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animated'),
  ],
};
```

### Explicación del Archivo `tailwind.config.js`

- `content`: Especifica los archivos que TailwindCSS debe procesar para generar las clases CSS. En este caso, todos los archivos en el directorio `src` con las extensiones `js`, `ts`, `jsx` y `tsx`.
- `theme`: Permite extender la configuración predeterminada de TailwindCSS.
- `plugins`: Lista de plugins que TailwindCSS debe usar. En este caso, estamos usando los plugins `@tailwindcss/typography` y `tailwindcss-animated`.

## Paso 4: Configurar Vite para Usar TailwindCSS

Abre el archivo `vite.config.ts` y agrega el plugin de TailwindCSS:

```typescript
// /template-ecommerce/frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    tsconfigPaths(),
  ],
});
```

### Explicación del Archivo `vite.config.ts`

- `defineConfig`: Función de Vite para definir la configuración del proyecto.
- `react`: Plugin de Vite para React.
- `tsconfigPaths`: Plugin de Vite para resolver rutas basadas en `tsconfig.json`.
- `tailwindcss`: Plugin de Vite para TailwindCSS.

## Paso 5: Agregar las Directivas de TailwindCSS en el Archivo CSS Principal

Crea un archivo CSS principal (por ejemplo, `src/index.css`) y agrega las directivas de TailwindCSS:

```css
/* src/index.css */
@import "tailwindcss";
```

### Explicación de las Directivas de TailwindCSS

- `@import "tailwindcss";`: Importa todas las utilidades de TailwindCSS.

## Paso 6: Configurar el Proyecto para Usar TailwindCSS

Abre el archivo `main.tsx` y asegúrate de importar el archivo CSS principal:

```typescript
// /template-ecommerce/frontend/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Importa el archivo CSS principal
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ToastContainer 
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
    />
  </StrictMode>,
);
```

## Paso 7: Instalar los Plugins Typography y TailwindCSS Animated

Instala los plugins Typography y TailwindCSS Animated utilizando PNPM:

```bash
pnpm install @tailwindcss/typography tailwindcss-animated
```

### ¿Qué es el Plugin Typography?

El plugin Typography de TailwindCSS proporciona una serie de clases de utilidad para estilizar contenido tipográfico, como artículos y publicaciones de blog.

### ¿Qué es TailwindCSS Animated?

TailwindCSS Animated es un plugin que agrega clases de utilidad para animaciones, permitiendo aplicar animaciones CSS de manera sencilla.

## Paso 8: Configurar los Plugins en TailwindCSS

Asegúrate de que los plugins estén configurados en el archivo `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animated'),
  ],
};
```

## Paso 9: Usar TailwindCSS en Componentes

Ahora puedes usar las clases de TailwindCSS en tus componentes de React. Aquí hay un ejemplo de un componente simple:

```tsx
// filepath: /c:/Users/costero/repos/un-momentum/template-ecommerce/frontend/src/components/ExampleComponent.tsx
import React from 'react';

const ExampleComponent: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Hola, TailwindCSS!</h1>
      <p className="text-gray-700">Este es un ejemplo de un componente utilizando TailwindCSS.</p>
    </div>
  );
};

export default ExampleComponent;
```


