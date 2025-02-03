# Estado Actual del Backend

Este documento describe el estado actual del backend del proyecto, incluyendo las versiones de las dependencias utilizadas y una explicación detallada de los archivos `server.ts`, `userRoutes.ts`, `authMiddleware.ts`, `userController.ts` y `userHandler.ts`.

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
- **ts-node-dev**: ^2.0.0
- **ts-node**: ^10.9.1
- **typescript**: ^5.7.3

## Descripción del archivo `server.ts`

El archivo `server.ts` es donde se configura el servidor Express. Aquí se configuran los middlewares, las rutas y se exporta la instancia del servidor. A continuación se describe cada sección del archivo:

```typescript
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const URL = process.env.FRONTEND_URL;
const server = express();

server.use(cors({
  origin: URL,
  credentials: true,
}));

server.use(morgan('dev'));
server.use(express.json());

server.use('/api', userRoutes);

server.get('/', (req, res) => {
  res.send('API de E-commerce');
});

export default server;
```

### Importaciones

- `express`: Importa el framework Express.
- `morgan`: Importa el middleware Morgan para el registro de solicitudes HTTP.
- `cors`: Importa el middleware CORS para permitir solicitudes de diferentes orígenes.
- `userRoutes`: Importa las rutas relacionadas con los usuarios desde el archivo `userRoutes.ts`.

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

- `server.use('/api', userRoutes);`: Configura las rutas relacionadas con los usuarios bajo el prefijo `/api`.
- `server.get('/', (req, res) => { res.send('API de E-commerce'); });`: Define una ruta raíz que responde con un mensaje simple.

### Exportación

- `export default server;`: Exporta la instancia del servidor para que pueda ser utilizada en otros archivos.

## Descripción del archivo `userRoutes.ts`

El archivo `userRoutes.ts` define las rutas relacionadas con los usuarios. A continuación se describe cada sección del archivo:

```typescript
import { Router } from 'express';
import { handleGetUsers, handleGetUserById, handleCreateUser, handleUpdateUser, handleDeleteUser } from '../handlers/userHandler';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/users', authMiddleware, handleGetUsers);
router.get('/users/:id', authMiddleware, handleGetUserById);
router.post('/users', authMiddleware, handleCreateUser);
router.put('/users/:id', authMiddleware, handleUpdateUser);
router.delete('/users/:id', authMiddleware, handleDeleteUser);

export default router;
```

### Importaciones

- `Router`: Importa el enrutador de Express para definir las rutas.
- `handleGetUsers`, `handleGetUserById`, `handleCreateUser`, `handleUpdateUser`, `handleDeleteUser`: Importa los manejadores de solicitudes desde `userHandler.ts`.
- `authMiddleware`: Importa el middleware de autenticación desde `authMiddleware.ts`.

### Definición de Rutas

- `const router = Router();`: Crea una instancia del enrutador de Express.

### Rutas de Usuario

- `router.get('/users', authMiddleware, handleGetUsers);`: Define una ruta GET para obtener todos los usuarios. Aplica el middleware de autenticación antes de llamar al manejador `handleGetUsers`.
- `router.get('/users/:id', authMiddleware, handleGetUserById);`: Define una ruta GET para obtener un usuario por ID. Aplica el middleware de autenticación antes de llamar al manejador `handleGetUserById`.
- `router.post('/users', authMiddleware, handleCreateUser);`: Define una ruta POST para crear un nuevo usuario. Aplica el middleware de autenticación antes de llamar al manejador `handleCreateUser`.
- `router.put('/users/:id', authMiddleware, handleUpdateUser);`: Define una ruta PUT para actualizar un usuario por ID. Aplica el middleware de autenticación antes de llamar al manejador `handleUpdateUser`.
- `router.delete('/users/:id', authMiddleware, handleDeleteUser);`: Define una ruta DELETE para eliminar un usuario por ID. Aplica el middleware de autenticación antes de llamar al manejador `handleDeleteUser`.

### Exportación

- `export default router;`: Exporta la instancia del enrutador para que pueda ser utilizada en otros archivos.

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

## Descripción del archivo `userController.ts`

El archivo `userController.ts` define la lógica de negocio relacionada con los usuarios. A continuación se describe cada sección del archivo:

```typescript
export const getUsers = (): string => {
  // Lógica para obtener todos los usuarios
  return 'Get all users';
};

export const getUserById = (id: string): string => {
  // Lógica para obtener un usuario por ID
  return `Get user with ID: ${id}`;
};

export const createUser = (name: string, email: string): string => {
  // Lógica para crear un nuevo usuario
  return `Create user with name: ${name} and email: ${email}`;
};

export const updateUser = (id: string, name: string, email: string): string => {
  // Lógica para actualizar un usuario por ID
  return `Update user with ID: ${id}, name: ${name}, email: ${email}`;
};

export const deleteUser = (id: string): string => {
  // Lógica para eliminar un usuario por ID
  return `Delete user with ID: ${id}`;
};
```

### Funciones del Controlador de Usuario

- `getUsers`: Lógica para obtener todos los usuarios.
- `getUserById`: Lógica para obtener un usuario por ID.
- `createUser`: Lógica para crear un nuevo usuario.
- `updateUser`: Lógica para actualizar un usuario por ID.
- `deleteUser`: Lógica para eliminar un usuario por ID.

## Descripción del archivo `userHandler.ts`

El archivo `userHandler.ts` maneja las solicitudes y respuestas relacionadas con los usuarios. A continuación se describe cada sección del archivo:

```typescript
import { Request, Response } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

export const handleGetUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getUsers();
    res.send(result);
  } catch (error) {
    res.status(500).send('Error getting users');
  }
};

export const handleGetUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await getUserById(id);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error getting user by ID');
  }
};

export const handleCreateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const result = await createUser(name, email);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error creating user');
  }
};

export const handleUpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const result = await updateUser(id, name, email);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error updating user');
  }
};

export const handleDeleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
};
```

### Importaciones

- `Request`, `Response`: Importa los tipos de Express para definir los tipos de los parámetros de las funciones manejadoras.
- `getUsers`, `getUserById`, `createUser`, `updateUser`, `deleteUser`: Importa las funciones del controlador de usuario desde `userController.ts`.

### Funciones Manejadoras

- `handleGetUsers`: Maneja la solicitud para obtener todos los usuarios y envía la respuesta. Utiliza `async/await` y `try-catch` para manejar errores.
- `handleGetUserById`: Maneja la solicitud para obtener un usuario por ID y envía la respuesta. Utiliza `async/await` y `try-catch` para manejar errores.
- `handleCreateUser`: Maneja la solicitud para crear un nuevo usuario y envía la respuesta. Utiliza `async/await` y `try-catch` para manejar errores.
- `handleUpdateUser`: Maneja la solicitud para actualizar un usuario por ID y envía la respuesta. Utiliza `async/await` y `try-catch` para manejar errores.
- `handleDeleteUser`: Maneja la solicitud para eliminar un usuario por ID y envía la respuesta. Utiliza `async/await` y `try-catch` para manejar errores.

## Árbol de Directorios del Backend

La estructura de directorios del backend es la siguiente:

```
backend/
├── dist/
├── node_modules/
├── src/
│   ├── controllers/
│   │   └── userController.ts
│   ├── handlers/
│   │   └── userHandler.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   ├── server.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

### Descripción de los Directorios

- **controllers/**: Contiene los controladores que gestionan la lógica de negocio. En este caso, `userController.ts` gestiona las operaciones relacionadas con los usuarios.
- **handlers/**: Contiene los manejadores de solicitudes que gestionan las respuestas HTTP. En este caso, `userHandler.ts` maneja las solicitudes relacionadas con los usuarios.
- **middlewares/**: Contiene los middlewares que se utilizan en el servidor. En este caso, `authMiddleware.ts` gestiona la autenticación.
- **routes/**: Contiene las rutas que definen los endpoints de la API. En este caso, `userRoutes.ts` define las rutas relacionadas con los usuarios.
- **server.ts**: Archivo donde se configuran los middlewares, las rutas y se exporta la instancia del servidor.
- **index.ts**: Archivo de entrada que inicia el servidor.
