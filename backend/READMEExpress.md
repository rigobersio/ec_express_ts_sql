# Bitácora Pedagógica del Backend

Este archivo registra las configuraciones y cambios realizados en el backend del proyecto SPA E-commerce.

## Pruebas Iniciales con Postman

Para realizar pruebas iniciales con Postman, sigue estos pasos:

1. Abre Postman.
2. Crea una nueva solicitud (Request).
3. Configura la solicitud para que sea de tipo `GET`.
4. Ingresa la URL del servidor backend (por ejemplo, `http://localhost:3000`).
5. Haz clic en `Send` para enviar la solicitud.
6. Deberías recibir una respuesta con un mensaje desde el servidor backend.

## Instalación de Dependencias Útiles

### CORS

CORS (Cross-Origin Resource Sharing) es un mecanismo que permite que los recursos restringidos en una página web sean solicitados desde otro dominio fuera del dominio desde el cual se sirvió el recurso. Para instalar CORS, ejecuta el siguiente comando:

```bash
pnpm install cors
```

### Morgan

Morgan es un middleware de registro de solicitudes HTTP para Node.js. Es útil para registrar las solicitudes entrantes y sus detalles. Para instalar Morgan, ejecuta el siguiente comando:

```bash
pnpm install morgan
```

## Levantar el Servidor

Para levantar el servidor, actualiza los scripts en el archivo `package.json` y asegúrate de que las dependencias necesarias estén instaladas.

### Actualización de `package.json`

```json
// filepath: /c:/repos/mis-apps/template-ecommece/backend/package.json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "keywords": [],
  "author": "Rigobersio",
  "license": "ISC",
  "dependencies": {
    "dotenv": "16.4.7",
    "express": "4.21.2",
    "pg": "8.13.1",
    "cors": "2.8.5",
    "morgan": "1.10.0"
  },
  "devDependencies": {
    "nodemon": "2.0.22"
  }
}
```

### Código del Servidor

Actualiza el archivo `src/index.js` para incluir las nuevas dependencias y levantar el servidor.

```javascript
// filepath: /c:/repos/mis-apps/template-ecommece/backend/src/index.js
import 'dotenv/config';
import app from './App.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
```

### Código de la Aplicación

Actualiza el archivo `src/App.js` para incluir las nuevas dependencias y la configuración del servidor.

```javascript
// filepath: /c:/repos/mis-apps/template-ecommece/backend/src/App.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const URL = process.env.FRONTEND_URL;
const app = express();

app.use(cors({
  origin: URL,
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de E-commerce');
});

export default app;
```

### Variables de Entorno

Para configurar las variables de entorno, crea un archivo `.env` en el directorio `backend` con el siguiente contenido:

```env
// filepath: /c:/repos/mis-apps/template-ecommece/backend/.env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
FRONTEND_URL=http://localhost:5173
```

### Levantar el Servidor

Para levantar el servidor en modo desarrollo, ejecuta el siguiente comando:

```bash
pnpm run dev
```

Para levantar el servidor en modo producción, ejecuta el siguiente comando:

```bash
pnpm start
```
