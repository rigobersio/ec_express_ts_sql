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
