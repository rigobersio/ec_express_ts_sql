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

# Bitácora

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

## Instalación de Express con TS

Para instalar Express con TS y `CommonJS`, sigue estos pasos:

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
    pnpm install -D typescript @types/express
    ```
`ya no es necesario instalar **@types/dotenv** porque dotenv ahora incluye sus propias definiciones (pnpm remove @types/dotenv)`

4. Configura el archivo `package.json`:

    ```json
    {
      "name": "backend",
      "version": "1.0.0",
      "main": "src/index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "pnpx tsc",
        "start": "node dist/index.js",
        "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
        "test-dev": "echo 'Running test script' && exit 0"
      }
    ...
    ```
"main": "src/index.js": La propiedad main en el archivo package.json especifica el punto de entrada principal del módulo. Es el archivo que se cargará cuando alguien importe tu paquete. En este caso, main está configurado para apuntar a dist/index.js porque este es el archivo JavaScript compilado que se genera después de que TypeScript transpila el código TypeScript.

Razón para dist/index.js en lugar de index.ts

5. Instalación de Dependencias Útiles

- Cors

Cors (Cross-Origin Resource Sharing) es un mecanismo que permite que los recursos restringidos en una página web sean solicitados desde otro dominio fuera del dominio desde el cual se sirvió el recurso. Para instalar CORS, ejecuta el siguiente comando:

```bash
pnpm install cors
```

- Morgan

Morgan es un middleware de registro de solicitudes HTTP para Node.js. Es útil para registrar las solicitudes entrantes y sus detalles. Para instalar Morgan, ejecuta el siguiente comando:

```bash
pnpm install morgan
```

- Instalación de los tipos para cors y morgan

```bash
pnpm install -D @types/cors @types/morgan
```

6. Inicializar TypeScript.

```bash
pnpx tsc --init
```
El archivo **tsconfig.json** generado indica el directorio raíz de tu aplicación TypeScript. Proporciona opciones de configuración para definir cómo deben trabajar los compiladores de TypeScript. Incluye una serie de opciones de configuración deshabilitadas o habilitadas, con comentarios que explican cada opción.

Añade las siguientes propiedades al objeto `compilerOptions` para definir el directorio de salida y otras configuraciones necesarias:

```json
{
  "compilerOptions": {
    "target": "ES2024",                        // Compila a ES2024
    "module": "CommonJS",                      // Usa CommonJS para que Node lo interprete sin problemas
    "rootDir": "./src",                        // Directorio fuente
    "outDir": "./dist",                        // Directorio de salida de los archivos compilados
    "strict": true,                            // Habilita todas las comprobaciones estrictas
    "esModuleInterop": true,                   // Facilita la interoperabilidad con módulos CommonJS
    "forceConsistentCasingInFileNames": true,  // Para evitar errores de mayúsculas/minúsculas
    "skipLibCheck": true                       // Omite la verificación de tipos en las librerías (para acelerar la compilación)
  },
  "include": ["src/**/*"]
}
```

7. Se creó el directorio `src` y un archivo `index.ts` dentro de él:

    ```typescript
    import express from 'express';
    import dotenv from 'dotenv';

    dotenv.config();

    const app = express();
    const port = process.env.PORT || 3000;

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    ```

    ```typescript
    import 'dotenv/config';
    import server from './src/server';

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
      console.log(`Server on port ${PORT}`);
    });
    ```

8. `src/index.ts`

    ```typescript
    import express from 'express';
    import server from './server';

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(server);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    ```

9. `src/server.ts`

    ```typescript
    import express from 'express';
    import morgan from 'morgan';
    import cors from 'cors';

    const URL = process.env.FRONTEND_URL;
    const server = express();

    server.use(cors({
      origin: URL,
      credentials: true,
    }));

    server.use(morgan('dev'));
    server.use(express.json());

    server.get('/', (req, res) => {
      res.send('API de E-commerce');
    });

    export default server;
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

# Git Clone

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
    pnpm run dev
    ```

5. Inicia el servidor frontend:

    ```bash
    cd ../frontend
    pnpm run dev
    ```

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

## Licencia

Este proyecto está bajo la Licencia MIT.
