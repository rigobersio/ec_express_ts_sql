# Proyecto SPA E-commerce

Este proyecto es una aplicación de e-commerce de una sola página (SPA) utilizando una arquitectura monorepo. El backend utiliza PostgreSQL y Express, mientras que el frontend está implementado con React, Vite, TailwindCSS (con el plugin Typography) y la gestión de estados globales con Zustand.

## Requisitos

- Node.js v22.13.1
- PostgreSQL
- Git
- PNPM

## Instalación de PNPM

Para instalar PNPM globalmente, ejecuta el siguiente comando:

```bash
npm install -g pnpm
```

## Instalación de NVM (Windows)

Para instalar NVM en Windows, sigue estos pasos:

1. Descarga el instalador de NVM para Windows desde [nvm-windows](https://github.com/coreybutler/nvm-windows/releases).
2. Ejecuta el instalador y sigue las instrucciones.
3. Una vez instalado, abre una terminal y ejecuta los siguientes comandos para instalar y usar la versión de Node.js v22.13.1:

    ```bash
    nvm install 22.13.1
    nvm use 22.13.1
    ```

## Instalación de React con Vite

Para instalar React con Vite, sigue estos pasos:

1. Crea un nuevo proyecto con Vite:

    ```bash
    pnpm create vite frontend --template react-ts
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd frontend
    ```

3. Instala las dependencias del proyecto:

    ```bash
    pnpm install
    ```

## Instalación de TailwindCSS y Typography Plugin

Para instalar TailwindCSS y el plugin Typography, sigue estos pasos:

1. Instala TailwindCSS y sus dependencias:

    ```bash
    pnpm install -D tailwindcss postcss autoprefixer
    ```

2. Inicializa TailwindCSS:

    ```bash
    npx tailwindcss init -p
    ```

3. Instala el plugin Typography:

    ```bash
    pnpm install @tailwindcss/typography
    ```

4. Configura TailwindCSS en el archivo `tailwind.config.js`:

    ```javascript
    module.exports = {
      content: ['./src/**/*.{js,ts,jsx,tsx}'],
      theme: {
        extend: {},
      },
      plugins: [
        require('@tailwindcss/typography'),
      ],
    };
    ```

5. Agrega las directivas de TailwindCSS en el archivo CSS principal (`src/index.css`):

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

## Instalación de Express con JavaScript

Para instalar Express con JavaScript y configurar `type: module`, sigue estos pasos:

1. Crea un nuevo directorio para el backend y navega a él:

    ```bash
    mkdir backend
    cd backend
    ```

2. Inicializa un nuevo proyecto de Node.js:

    ```bash
    pnpm init
    ```

3. Instala Express y otras dependencias necesarias:

    ```bash
    pnpm install express pg dotenv
    ```

4. Configura el archivo `package.json` para usar módulos ES:

    ```json
    {
      "name": "backend",
      "version": "1.0.0",
      "main": "src/index.js",
      "type": "module",
    }
    ```

## Instalación del Proyecto

1. Clona el repositorio:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd template-ecommece
    ```

2. Instala las dependencias del backend y frontend:

    ```bash
    cd backend
    pnpm install
    cd ../frontend
    pnpm install
    ```

3. Configura la base de datos PostgreSQL:

    - Crea una base de datos en PostgreSQL.
    - Configura las variables de entorno en el archivo `.env` en el directorio `backend` con los detalles de la base de datos.

4. Inicia el servidor backend:

    ```bash
    cd backend
    pnpm start
    ```

5. Inicia el servidor frontend:

    ```bash
    cd ../frontend
    pnpm run dev
    ```

## Evitar Actualizaciones de Dependencias

Para evitar actualizaciones de dependencias, asegúrate de usar versiones exactas en los archivos `package.json` del frontend y backend. Por ejemplo:

```json
"dependencies": {
  "express": "4.17.1",
  "pg": "8.6.0"
}
```

### Permitir Actualizaciones Específicas

Si deseas permitir actualizaciones menores o mayores para algunas dependencias específicas, puedes usar los siguientes formatos en el archivo `package.json`:

- Para permitir actualizaciones menores (por ejemplo, de `4.17.1` a `4.17.x`):

    ```json
    "express": "~4.17.1"
    ```

- Para permitir actualizaciones mayores (por ejemplo, de `4.17.1` a `x.x.x`):

    ```json
    "express": "^4.17.1"
    ```

## Funcionalidades

### Sistema de Rutas Protegidas

El sistema de rutas protegidas utiliza `Navigate`, `Outlet`, `createBrowserRouter` y `RouterProvider` de `react-router-dom` para gestionar la navegación y protección de rutas.

### Vista de Productos

La vista de productos incluye filtros por precio, marca y palabras clave. La paginación se implementa donde sea más eficiente (frontend o backend) y los resultados se persisten en `localStorage`.

### Carrito de Compras

El carrito de compras incluye persistencia de datos y está integrado con una pasarela de pagos para facilitar las transacciones.

## Estructura del Proyecto

```
template-ecommece/
├── backend/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

## Bloquear Versiones de Dependencias

Para bloquear las versiones de las dependencias en los archivos `package.json` del frontend y backend, asegúrate de usar versiones exactas en lugar de rangos de versiones. Por ejemplo:

```json
"dependencies": {
  "express": "4.17.1",
  "pg": "8.6.0"
}
```

## Contribución

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT.
