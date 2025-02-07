# Integración de la Base de Datos con Express y SQL

## Estructura de Directorios del Backend
La estructura de directorios del backend es la siguiente:

```
backend/
├── dist/
├── node_modules/
├── src/
│   ├── controllers/
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

## Variables de Entorno
Las variables de entorno se configuran en el archivo `.env`.

```properties
PORT=3000
DATABASE_URL=postgresql://template_ps_e_commerce_user:<password>@dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com/template_ps_e_commerce
FRONTEND_URL=http://localhost:5173
PGHOST=dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com
PGUSER=template_ps_e_commerce_user
PGPASSWORD=<password>
PGDATABASE=template_ps_e_commerce
PGPORT=5432
```

## Paso 1: Configuración de la Conexión a la Base de Datos
Para conectar tu aplicación Express a PostgreSQL, utilizaremos el paquete `pg` para la gestión de la base de datos.

### Configuración de la Conexión
Crea un archivo `src/database/connection.ts` para configurar la conexión a la base de datos:

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
```

### Explicación de `Pool` y la instancia `pool`
- **Pool**: `Pool` es una clase proporcionada por el paquete `pg` que gestiona un grupo de conexiones a la base de datos PostgreSQL. Utilizar un pool de conexiones permite reutilizar conexiones existentes en lugar de crear nuevas conexiones para cada solicitud, lo que mejora el rendimiento y la eficiencia.
- **Instancia `pool`**: La instancia `pool` se crea utilizando la clase `Pool` y se configura con los detalles de la conexión a la base de datos. En este caso, se utiliza la variable de entorno `DATABASE_URL` para obtener la cadena de conexión y se habilita SSL con la opción `rejectUnauthorized` establecida en `false`.
  - **Propiedad `ssl`**: La propiedad `ssl` se utiliza para habilitar la conexión segura mediante el protocolo SSL (Secure Sockets Layer). Esto asegura que los datos transmitidos entre el cliente y el servidor estén encriptados y protegidos contra interceptaciones.
  - **Propiedad `rejectUnauthorized`**: La propiedad `rejectUnauthorized` se establece en `false` para permitir conexiones a servidores con certificados SSL autofirmados o no verificados. Esto es útil en entornos de desarrollo, pero en producción se recomienda establecerla en `true` para garantizar la autenticidad del servidor.

## Paso 2: Configuración del Controlador `getUsersController.ts`
El controlador `getUsersController.ts` se encuentra en la carpeta `src/controllers/`. Este archivo contiene la lógica para obtener todos los usuarios de la base de datos.

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

### Explicación de `client` y el método `query`
- **client**: `client` es una instancia de conexión a la base de datos obtenida del pool de conexiones. Se utiliza para ejecutar consultas SQL en la base de datos.
- **Método `query`**: El método `query` se utiliza para ejecutar una consulta SQL en la base de datos. En este caso, la consulta `SELECT * FROM users` se utiliza para obtener todos los registros de la tabla `users`.
  - **Sintaxis**: `client.query('consulta SQL')`
  - **Propósito**: Ejecutar una consulta SQL y devolver los resultados.
  - **Resultado**: El resultado de la consulta se almacena en `res`, y los registros obtenidos se encuentran en `res.rows`.
  - **Detalles**: El método `query` envía la consulta SQL al servidor PostgreSQL y espera la respuesta. La respuesta incluye los datos solicitados y cualquier información adicional sobre la ejecución de la consulta.

### Explicación del método `release`
- **Método `release`**: El método `release` se utiliza para liberar la conexión de la base de datos de vuelta al pool de conexiones. Esto permite que la conexión sea reutilizada por otras solicitudes en lugar de ser cerrada.
  - **Propósito**: Asegurar que la conexión se libere después de que se complete la consulta, permitiendo que otras solicitudes puedan utilizarla.
  - **Sintaxis**: `client.release()`
  - **Importancia**: Liberar la conexión es crucial para evitar fugas de conexiones y asegurar que el pool de conexiones funcione de manera eficiente.

### Explicación de la ausencia de `catch`
- **Ausencia de `catch`**: En este caso, no se utiliza un bloque `catch` explícito porque cualquier error que ocurra durante la ejecución de la consulta será manejado por el bloque `finally`. El bloque `finally` asegura que la conexión se libere incluso si ocurre un error. Sin embargo, es una buena práctica agregar un bloque `catch` para manejar errores específicos y proporcionar mensajes de error más detallados.

## Paso 3: Realizar la Solicitud con Postman
1. Abre Postman y crea una nueva solicitud.
2. Configura la solicitud como `GET`.
3. Ingresa la URL de la solicitud: `http://localhost:3000/users/get`.
4. Haz clic en `Send` para enviar la solicitud.
5. Deberías recibir una respuesta con todos los usuarios de la tabla `users`.






