# Estado Actual del Backend

Este documento describe el estado actual del backend del proyecto, incluyendo las versiones de las dependencias utilizadas y una explicación detallada de los archivos `server.ts`, `mainRouter.ts`, `usersRoutes.ts`, `authMiddleware.ts`, `getUsersController.ts` y `userHandler.ts`.

## package.json

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "pnpx tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "test-dev": "echo 'Running test script' && exit 0"
  },
  "keywords": [],
  "author": "Rigobersio",
  "license": "ISC",
  "dependencies": {
    "cors": "~2.8.5",
    "dotenv": "~16.4.7",
    "express": "~4.21.2",
    "morgan": "~1.10.0",
    "pg": "~8.13.1"
  },
  "devDependencies": {
    "@types/cors": "~2.8.17",
    "@types/express": "~5.0.0",
    "@types/morgan": "1.9.9",
    "@types/pg": "~8.11.11",
    "ts-node-dev": "~2.0.0",
    "ts-node": "~10.9.1",
    "typescript": "~5.7.3"
  }
}
```

## Dependencias

- **cors**: ^2.8.5
- **dotenv**: ^16.4.7
- **express**: ^4.21.2
- **morgan**: ^1.10.0
- **pg**: ^8.13.1

## Dependencias de Desarrollo

- **@types/cors**: ^2.8.17
- **@types/express**: ^5.0.0
- **@types/morgan**: ^1.9.9
- **@types/pg**: ^8.11.11
- **ts-node-dev**: ^2.0.0
- **ts-node**: ^10.9.1
- **typescript**: ^5.7.3

## Descripción del archivo `server.ts`

El archivo `server.ts` es donde se configura el servidor Express. Aquí se configuran los middlewares, las rutas y se exporta la instancia del servidor. A continuación se describe cada sección del archivo:

```typescript
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mainRouter from './routes/mainRouter';

const URL = process.env.FRONTEND_URL;
const server = express();

server.use(cors({
  origin: URL,
  credentials: true,
}));

server.use(morgan('dev'));
server.use(express.json());

server.use(mainRouter);

server.get('/', (req, res) => {
  res.send('API de E-commerce');
});

export default server;
```

### Importaciones

- `express`: Importa el framework Express.
- `morgan`: Importa el middleware Morgan para el registro de solicitudes HTTP.
- `cors`: Importa el middleware CORS para permitir solicitudes de diferentes orígenes.
- `mainRouter`: Importa las rutas principales desde el archivo `mainRouter.ts`.

### Configuración del Servidor

- `const URL = process.env.FRONTEND_URL;`: Obtiene la URL del frontend desde las variables de entorno.
- `const server = express();`: Crea una instancia del servidor Express.

### Middlewares

- `server.use(cors({ origin: URL, credentials: true }));`: Configura el middleware CORS para permitir solicitudes desde la URL especificada y con credenciales.
- `server.use(morgan('dev'));`: Configura el middleware Morgan para registrar las solicitudes HTTP en modo de desarrollo.
- `server.use(express.json());`: Configura el middleware para analizar las solicitudes JSON.

### Método `use`

El método `use` en Express se utiliza para montar middleware en la aplicación. Un middleware es una función que tiene acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud/respuesta de la aplicación. En este archivo, se utilizan varios middlewares:

- `server.use(cors({ origin: URL, credentials: true }));`: Este middleware permite solicitudes CORS desde la URL especificada y con credenciales.
- `server.use(morgan('dev'));`: Este middleware registra las solicitudes HTTP en modo de desarrollo.
- `server.use(express.json());`: Este middleware analiza las solicitudes JSON y las convierte en objetos JavaScript accesibles a través de `req.body`.

### Rutas

- `server.use(mainRouter);`: Configura las rutas principales.
- `server.get('/', (req, res) => { res.send('API de E-commerce'); });`: Define una ruta raíz que responde con un mensaje simple.

### Exportación

- `export default server;`: Exporta la instancia del servidor para que pueda ser utilizada en otros archivos.

## Descripción del archivo `mainRouter.ts`

El archivo `mainRouter.ts` define las rutas principales de la aplicación. A continuación se describe cada sección del archivo:

```typescript
import { Router } from 'express';
import usersRoutes from './usersRoutes';

const mainRouter = Router();

mainRouter.use('/users', usersRoutes);

export default mainRouter;
```

### Importaciones

- `Router`: Importa el enrutador de Express para definir las rutas.
- `usersRoutes`: Importa las rutas relacionadas con los usuarios desde el archivo `usersRoutes.ts`.

### Definición de Rutas

- `const mainRouter = Router();`: Crea una instancia del enrutador de Express.
- `mainRouter.use('/users', usersRoutes);`: Configura las rutas relacionadas con los usuarios bajo el prefijo `/users`.

### Exportación

- `export default mainRouter;`: Exporta la instancia del enrutador principal para que pueda ser utilizada en otros archivos.

## Descripción del archivo `usersRoutes.ts`

El archivo `usersRoutes.ts` define las rutas relacionadas con los usuarios. A continuación se describe cada sección del archivo:

```typescript
import { Router } from 'express';
import { handleGetUsers, handleGetUserById, handleCreateUser, handleUpdateUser, handleDeleteUser } from '../handlers/userHandler';
import { authMiddleware } from '../middlewares/authMiddleware';

const usersRoutes = Router();

usersRoutes.get('/get', authMiddleware, handleGetUsers);
usersRoutes.get('/get/:id', authMiddleware, handleGetUserById);
usersRoutes.post('/post', authMiddleware, handleCreateUser);
usersRoutes.put('/put/:id', authMiddleware, handleUpdateUser);
usersRoutes.delete('/delete/:id', authMiddleware, handleDeleteUser);

export default usersRoutes;
```

### Importaciones

- `Router`: Importa el enrutador de Express para definir las rutas.
- `handleGetUsers`, `handleGetUserById`, `handleCreateUser`, `handleUpdateUser`, `handleDeleteUser`: Importa los manejadores de solicitudes desde `userHandler.ts`.
- `authMiddleware`: Importa el middleware de autenticación desde `authMiddleware.ts`.

### Definición de Rutas

- `const usersRoutes = Router();`: Crea una instancia del enrutador de Express.

### Rutas de Usuario

- `usersRoutes.get('/get', authMiddleware, handleGetUsers);`: Define una ruta GET para obtener todos los usuarios. Aplica el middleware de autenticación antes de llamar al manejador `handleGetUsers`.
- `usersRoutes.get('/get/:id', authMiddleware, handleGetUserById);`: Define una ruta GET para obtener un usuario por ID. Aplica el middleware de autenticación antes de llamar al manejador `handleGetUserById`.
- `usersRoutes.post('/post', authMiddleware, handleCreateUser);`: Define una ruta POST para crear un nuevo usuario. Aplica el middleware de autenticación antes de llamar al manejador `handleCreateUser`.
- `usersRoutes.put('/put/:id', authMiddleware, handleUpdateUser);`: Define una ruta PUT para actualizar un usuario por ID. Aplica el middleware de autenticación antes de llamar al manejador `handleUpdateUser`.
- `usersRoutes.delete('/delete/:id', authMiddleware, handleDeleteUser);`: Define una ruta DELETE para eliminar un usuario por ID. Aplica el middleware de autenticación antes de llamar al manejador `handleDeleteUser`.

### Exportación

- `export default usersRoutes;`: Exporta la instancia del enrutador para que pueda ser utilizada en otros archivos.

## Descripción del archivo `authMiddleware.ts`

El archivo `authMiddleware.ts` define un middleware de autenticación. A continuación se describe cada sección del archivo:

```typescript
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Por ahora, aprueba todas las solicitudes
  next();
};
```

### Importaciones

- `Request`, `Response`, `NextFunction`: Importa los tipos de Express para definir los tipos de los parámetros de la función middleware.

### Función Middleware

- `export const authMiddleware = (req: Request, res: Response, next: NextFunction) => { ... }`: Define y exporta la función middleware de autenticación.

### Parámetros de la Función Middleware

- `req: Request`: El objeto de solicitud (request) que contiene información sobre la solicitud HTTP.
- `res: Response`: El objeto de respuesta (response) que se utiliza para enviar una respuesta HTTP.
- `next: NextFunction`: Una función que se llama para pasar el control al siguiente middleware en la pila.

### Diferencia entre JavaScript y TypeScript en el Middleware

En JavaScript, el middleware se define sin tipos, lo que puede llevar a errores en tiempo de ejecución si los parámetros no se utilizan correctamente. En TypeScript, se utilizan tipos estáticos para definir los parámetros, lo que permite detectar errores en tiempo de compilación y mejorar la calidad del código.

- **JavaScript**:
    ```javascript
    const authMiddleware = (req, res, next) => {
      // Por ahora, aprueba todas las solicitudes
      next();
    };

    module.exports = authMiddleware;
    ```

- **TypeScript**:
    ```typescript
    import { Request, Response, NextFunction } from 'express';

    export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
      // Por ahora, aprueba todas las solicitudes
      next();
    };
    ```

En el ejemplo de TypeScript, los tipos de los parámetros `req`, `res` y `next` se definen como `Request`, `Response` y `NextFunction`, respectivamente. Esto permite detectar errores en tiempo de compilación si los parámetros no se utilizan correctamente.

## Descripción del archivo `getUsersController.ts`

El archivo `getUsersController.ts` define la lógica de negocio para obtener todos los usuarios. A continuación se describe cada sección del archivo:

```typescript
import pool from '../database/connection';

export const getUsers = async (): Promise<any[]> => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users');
    return res.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  } finally {
    client.release();
  }
};
```

### Importaciones

- `pool`: Importa la conexión a la base de datos desde `connection.ts`.

### Función `getUsers`

- `export const getUsers = async (): Promise<any[]> => { ... }`: Define y exporta la función `getUsers` que retorna todos los usuarios de la base de datos.

### Lógica

- `const client = await pool.connect();`: Obtiene una conexión del pool de conexiones.
- `const res = await client.query('SELECT * FROM users');`: Ejecuta una consulta SQL para obtener todos los usuarios.
- `return res.rows;`: Retorna los registros obtenidos de la consulta.
- `client.release();`: Libera la conexión de vuelta al pool de conexiones.

## Descripción del archivo `userHandler.ts`

El archivo `userHandler.ts` maneja las solicitudes y respuestas relacionadas con los usuarios. A continuación se describe cada sección del archivo:

```typescript
import { Request, Response } from 'express';
import { getUsers } from '../controllers/getUsersController';

export const handleGetUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getUsers();
    res.status(200).json({
      message: "List users",
      result
    });
  } catch (error) {
    res.status(500).send('Error getting users');
  }
};
```

### Importaciones

- `Request`, `Response`: Importa los tipos de Express para definir los tipos de los parámetros de las funciones manejadoras.
- `getUsers`: Importa la función `getUsers` desde `getUsersController.ts`.

### Función `handleGetUsers`

- `export const handleGetUsers = async (req: Request, res: Response): Promise<void> => { ... }`: Define y exporta la función `handleGetUsers` que maneja la solicitud para obtener todos los usuarios y envía la respuesta.
- `const result = await getUsers();`: Llama a la función `getUsers` para obtener todos los usuarios.
- `res.status(200).json({ message: "List users", result });`: Envía la respuesta con el estado 200 y los usuarios obtenidos.

## Árbol de Directorios del Backend

La estructura de directorios del backend es la siguiente:

```
backend/
├── dist/
├── node_modules/
├── src/
│   ├── controllers/users
│   │   └── getUsersController.ts
│   ├── database/
│   │   └── usersDatabase.ts
│   ├── handlers/
│   │   └── userHandler.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   ├── routes/
│   │   ├── mainRouter.ts
│   │   └── usersRoutes.ts
│   ├── server.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

### Descripción de los Directorios

- **controllers/**: Contiene los controladores que gestionan la lógica de negocio. En este caso, `getUsersController.ts` gestiona la operación para obtener todos los usuarios.
- **database/**: Contiene la base de datos simulada de usuarios. En este caso, `usersDatabase.ts` define los usuarios simulados.
- **handlers/**: Contiene los manejadores de solicitudes que gestionan las respuestas HTTP. En este caso, `userHandler.ts` maneja las solicitudes relacionadas con los usuarios.
- **middlewares/**: Contiene los middlewares que se utilizan en el servidor. En este caso, `authMiddleware.ts` gestiona la autenticación.
- **routes/**: Contiene las rutas que definen los endpoints de la API. En este caso, `mainRouter.ts` define las rutas principales y `usersRoutes.ts` define las rutas relacionadas con los usuarios.
- **server.ts**: Archivo donde se configuran los middlewares, las rutas y se exporta la instancia del servidor.
- **index.ts**: Archivo de entrada que inicia el servidor.

## Referencias a Otros Archivos de Documentación

- **Diagrama de Entidad-Relación**: Los detalles sobre el diagrama de entidad-relación están en [ERD.md](./ERD.md).
- **Configuraciones y Despliegue de la Base de Datos**: Las configuraciones y despliegue de la base de datos están en [DatabaseSetup.md](./DatabaseSetup.md).
- **Integración de la Base de Datos con Express**: La integración de la base de datos con Express está en [DBExpress.md](./DBExpress.md).
- **Detalles sobre SQL**: Otros detalles sobre SQL están en [SQL.md](./SQL.md).

### Nota
En este servidor Express con TypeScript no se utiliza un ORM, sino que se trabaja directamente con SQL.
