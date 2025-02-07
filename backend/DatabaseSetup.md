# Configuración de la Base de Datos y Comandos SQL

## Creación de una Base de Datos
Para crear una nueva base de datos, puedes usar `psql` o pgAdmin.

### Usando `psql` en Windows
1. Abre la línea de comandos de PostgreSQL. Puedes encontrarla en el menú de inicio como "SQL Shell (psql)".
2. Cuando abras `psql`, verás una serie de preguntas para configurar la conexión. Puedes presionar `Enter` para aceptar los valores predeterminados o ingresar los valores específicos proporcionados por Render:
    ```
    Server [localhost]: dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com
    Database [postgres]: template_ps_e_commerce
    Port [5432]: 5432
    Username [postgres]: template_ps_e_commerce_user
    ```
    - **Server**: La dirección del servidor PostgreSQL proporcionada por Render. En este caso, `dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com`.
    - **Database**: El nombre de la base de datos proporcionada por Render. En este caso, `template_ps_e_commerce`.
    - **Port**: El puerto en el que PostgreSQL está escuchando, proporcionado por Render. En este caso, `5432`.
    - **Username**: El nombre de usuario proporcionado por Render. En este caso, `template_ps_e_commerce_user`.

3. Ingresa la contraseña para el usuario `template_ps_e_commerce_user` cuando se te solicite:
    ```
    Password for user template_ps_e_commerce_user: **key**
    ```

4. Si encuentras el error `psql: error: no se pudo traducir el nombre «dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com» a una dirección: Name or service not known`, sigue estos pasos:
    - Asegúrate de que tu conexión a Internet esté activa.
    - Verifica que el servidor PostgreSQL en Render esté en funcionamiento.
    - Intenta conectarte utilizando la URL completa de la base de datos proporcionada por Render:
        ```bash
        psql postgresql://template_ps_e_commerce_user:**key**@dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com/template_ps_e_commerce
        ```

5. Una vez conectado, verás el prompt de `psql`:
    ```
    template_ps_e_commerce=#
    ```

6. Crea una nueva base de datos (si es necesario):
    ```sql
    CREATE DATABASE ecommerce_db;
    ```
    - `CREATE DATABASE`: Comando SQL para crear una nueva base de datos.
    - `ecommerce_db`: Nombre de la nueva base de datos que deseas crear.

7. Verifica que la base de datos se ha creado correctamente listando todas las bases de datos:
    ```sql
    \l
    ```
    - `\l`: Comando de `psql` para listar todas las bases de datos en el servidor PostgreSQL.

8. Sal de `psql`:
    ```sql
    \q
    ```
    - `\q`: Comando de `psql` para salir de la interfaz de línea de comandos.

Estos pasos te permitirán crear una nueva base de datos en PostgreSQL utilizando `psql` en un entorno Windows.

### Configurar la Variable de Entorno de PostgreSQL en Windows
1. Abre el Panel de Control y selecciona "Sistema y seguridad".
2. Haz clic en "Sistema" y luego en "Configuración avanzada del sistema".
3. En la ventana de Propiedades del sistema, haz clic en el botón "Variables de entorno".
4. En la sección "Variables del sistema", busca la variable `Path` y haz clic en "Editar".
5. Agrega la ruta al directorio `bin` de PostgreSQL. Por ejemplo:
    ```
    C:\Program Files\PostgreSQL\13\bin
    ```
6. Haz clic en "Aceptar" para guardar los cambios.

## Despliegue de Base de Datos PostgreSQL en Render

### Crear una Cuenta en Render
1. Visita [Render](https://render.com/) y crea una cuenta o inicia sesión si ya tienes una cuenta.

### Crear un Nuevo Proyecto
1. Haz clic en "New Project" para crear un nuevo proyecto.
2. Selecciona "Provision PostgreSQL" para crear una nueva instancia de base de datos PostgreSQL.

### Configurar la Base de Datos
1. Una vez creada la instancia, Render te proporcionará las credenciales de conexión (host, database, user, password, port). Estas credenciales se mostrarán en la sección "Connect" o "Variables".
2. Copia las siguientes credenciales:
    - **host**: `dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com`
    - **database**: `template_ps_e_commerce`
    - **user**: `template_ps_e_commerce_user`
    - **password**: `**key**`
    - **port**: `5432`
    - **External Database URL**: `postgresql://template_ps_e_commerce_user:**key**@dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com/template_ps_e_commerce`
    - **PSQL Command**: `psql -h dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com -U template_ps_e_commerce_user template_ps_e_commerce`

### Conectar a la Base de Datos desde PowerShell o CMD
1. Abre PowerShell o CMD.
2. Conéctate a la base de datos utilizando las credenciales proporcionadas por Render:
    ```bash
    psql -h dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com -U template_ps_e_commerce_user -d template_ps_e_commerce -p 5432
    ```
    - **-h**: Especifica el host del servidor PostgreSQL. En este caso, `dpg-cui2jbaj1k6c73aoc1fg-a.oregon-postgres.render.com`.
    - **-U**: Especifica el nombre de usuario. En este caso, `template_ps_e_commerce_user`.
    - **-d**: Especifica el nombre de la base de datos. En este caso, `template_ps_e_commerce`.
    - **-p**: Especifica el puerto en el que PostgreSQL está escuchando. En este caso, `5432`.

3. Ingresa la contraseña **__key__** cuando se te solicite.

## Crear las Tablas en la Base de Datos
A continuación se presentan los comandos SQL necesarios para crear las tablas en el orden correcto.

### Comando para Crear la Tabla `users`
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50),
  wallet DECIMAL(10, 2) DEFAULT 0.00
);
```

### Comando para Crear la Tabla `brands`
```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100),
  description TEXT
);
```

### Comando para Crear la Tabla `products`
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100),
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL,
  discount DECIMAL(5, 2) DEFAULT 0.00,
  brand_id UUID,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);
```

### Comando para Crear la Tabla `addresses`
```sql
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  address_type VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Comando para Crear la Tabla `orders`
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  status VARCHAR(50),
  total_price DECIMAL(10, 2) NOT NULL,
  order_date TIMESTAMP,
  address_id UUID,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (address_id) REFERENCES addresses(id)
);
```

### Comando para Crear la Tabla `order_items`
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID,
  product_id UUID,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Comando para Crear la Tabla `categories`
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100),
  description TEXT
);
```

### Comando para Crear la Tabla `product_categories`
```sql
CREATE TABLE product_categories (
  product_id UUID,
  category_id UUID,
  PRIMARY KEY (product_id, category_id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### Comando para Crear la Tabla `payment_methods`
```sql
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  type VARCHAR(50),
  provider VARCHAR(100),
  account_number VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Comando para Crear la Tabla `reviews`
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID,
  user_id UUID,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Comando para Crear la Tabla `refunds`
```sql
CREATE TABLE refunds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_item_id UUID,
  amount DECIMAL(10, 2) NOT NULL,
  reason TEXT,
  refund_date TIMESTAMP,
  returned BOOLEAN,
  refund_percent DECIMAL(5, 2),
  FOREIGN KEY (order_item_id) REFERENCES order_items(id)
);
```

### Comando para Crear la Tabla `purchase_history`
```sql
CREATE TABLE purchase_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  order_id UUID,
  purchase_date TIMESTAMP,
  total_amount DECIMAL(10, 2),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### Agregar un Nuevo Campo `image_urls` a la Tabla `products`
Para agregar un nuevo campo `image_urls` a la tabla `products`, utiliza el siguiente comando SQL:

```sql
ALTER TABLE products
ADD COLUMN image_urls TEXT;

-- Insertar productos
INSERT INTO products (name, description, price, stock, discount, brand_id) VALUES
('Producto A', 'Descripción del Producto A', 29.99, 50, 10.00, NULL),
('Producto B', 'Descripción del Producto B', 49.99, 30, 5.00, NULL);
```
### Agregar un Nuevo Campo `image_urls` a la Tabla `products`
Para agregar un nuevo campo `image_urls` a la tabla `products`, utiliza el siguiente comando SQL:

```sql
ALTER TABLE products
ADD COLUMN image_urls TEXT;
```

### Insertar URLs de Imágenes en los Productos Existentes
Para agregar URLs de imágenes a los productos que ya existen, utiliza el siguiente comando SQL:

```sql
-- Actualizar productos con URLs de imágenes
UPDATE products
SET image_urls = '["https://example.com/productoA1.jpg", "https://example.com/productoA2.jpg", "https://example.com/productoA3.jpg", "https://example.com/productoA4.jpg"]'
WHERE name = 'Producto A';

UPDATE products
SET image_urls = '["https://example.com/productoB1.jpg", "https://example.com/productoB2.jpg", "https://example.com/productoB3.jpg", "https://example.com/productoB4.jpg"]'
WHERE name = 'Producto B';
```

### Explicación de los Comandos SQL
- **CREATE EXTENSION IF NOT EXISTS "uuid-ossp";**: Habilita la extensión `uuid-ossp` para generar UUIDs.
- **CREATE TABLE**: Crea una nueva tabla en la base de datos.
- **UUID**: Define una columna como un identificador único universal.
- **PRIMARY KEY**: Define una columna como clave primaria.
- **DEFAULT uuid_generate_v4()**: Establece un valor predeterminado generado por la función `uuid_generate_v4()`.
- **VARCHAR(n)**: Define una columna como una cadena de texto con un límite máximo de `n` caracteres.
- **TEXT**: Define una columna como una cadena de texto de longitud variable.
- **DECIMAL(10, 2)**: Define una columna como un número decimal con 10 dígitos en total y 2 decimales.
- **INT**: Define una columna como un número entero.
- **NOT NULL**: Indica que una columna no puede contener valores nulos.
- **UNIQUE**: Indica que los valores en una columna deben ser únicos.
- **FOREIGN KEY**: Define una columna como clave foránea que referencia a otra tabla.
- **CHECK (condición)**: Define una restricción que los valores en una columna deben cumplir.

## Configuración de la Conexión a la Base de Datos
Crear un módulo de base de datos en `src/database/db.ts` para manejar la conexión. Este módulo utilizará las variables de entorno configuradas anteriormente.

```typescript
// filepath: src/database/db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
});

export default pool;
```

## Ejecución de Scripts SQL
Ejecutar los scripts SQL manualmente o desde el código. Puedes usar una herramienta como `psql` o ejecutar los scripts desde el código.

```typescript
// filepath: src/database/migrate.ts
import pool from './db';
import fs from 'fs';
import path from 'path';

const migrate = async () => {
  const migrationPath = path.join(__dirname, 'migrations', 'create_tables.sql');
  const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');
  
  try {
    await pool.query(migrationSQL);
    console.log('Migración completada');
  } catch (err) {
    console.error('Error en la migración', err);
  } finally {
    pool.end();
  }
};

migrate();
```

## Pruebas
Realizar pruebas con **Postman** o una herramienta similar para asegurarse de que la conexión y las consultas funcionan correctamente.

## Actualización del README
Actualizar el archivo **READMEExpress.md** con los cambios realizados y las instrucciones para configurar la base de datos.

## Notas Adicionales
- Ejecutar las consultas SQL en PostgreSQL antes de iniciar la aplicación.
- Incluir un archivo `.sql` con los scripts de creación de tablas en la carpeta `migrations/`.
- Si surgen dudas o problemas, comentarlo antes de hacer el PR.

## Tipos de Datos en PostgreSQL
### Tipos de Datos Comunes
- `UUID`: Un identificador único universal.
- `INTEGER`: Un número entero.
- `SERIAL`: Un número entero que se incrementa automáticamente.
- `VARCHAR(n)`: Una cadena de texto de longitud variable con un límite máximo de `n` caracteres.
- `TEXT`: Una cadena de texto de longitud variable sin límite máximo.
- `BOOLEAN`: Un valor booleano (`TRUE` o `FALSE`).
- `DATE`: Una fecha (año, mes, día).
- `TIMESTAMP`: Una marca de tiempo (fecha y hora).

### Características de los Tipos de Datos
- **UUID**: Utilizado para generar identificadores únicos universales. Ejemplo: `id UUID PRIMARY KEY DEFAULT uuid_generate_v4()`.
- **INTEGER**: Utilizado para almacenar números enteros. Ejemplo: `age INTEGER`.
- **SERIAL**: Utilizado para generar valores únicos automáticamente. Ejemplo: `id SERIAL PRIMARY KEY`.
- **VARCHAR(n)**: Utilizado para almacenar cadenas de texto con una longitud máxima. Ejemplo: `name VARCHAR(100)`.
- **TEXT**: Utilizado para almacenar cadenas de texto largas. Ejemplo: `description TEXT`.
- **BOOLEAN**: Utilizado para almacenar valores booleanos. Ejemplo: `is_active BOOLEAN`.
- **DATE**: Utilizado para almacenar fechas. Ejemplo: `birthdate DATE`.
- **TIMESTAMP**: Utilizado para almacenar marcas de tiempo. Ejemplo: `created_at TIMESTAMP`.

### Diferencias entre UUID, INTEGER y BIGINT para PK y FK
- **UUID**: 
  - Ventajas: Garantiza unicidad global, útil en sistemas distribuidos, no revela información sobre el orden de inserción.
  - Desventajas: Ocupa más espacio (16 bytes), puede ser más lento en comparación con INTEGER debido a su tamaño.
- **INTEGER**:
  - Ventajas: Ocupa menos espacio (4 bytes), más rápido en comparación con UUID, fácil de leer y manejar.
  - Desventajas: Limitado a 2,147,483,647 valores únicos, puede revelar información sobre el orden de inserción.
- **BIGINT**:
  - Ventajas: Similar a INTEGER pero con un rango mucho mayor (8 bytes), útil para grandes conjuntos de datos.
  - Desventajas: Ocupa más espacio que INTEGER, puede ser más lento en comparación con INTEGER.

## Conclusión
Este documento proporciona una guía detallada sobre la creación de una base de datos, comandos SQL básicos y tipos de datos en PostgreSQL. Estos conceptos son fundamentales para el diseño y la gestión de bases de datos en la aplicación de e-commerce.
