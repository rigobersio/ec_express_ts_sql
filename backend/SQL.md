# Guía Completa para la Integración de PostgreSQL con SQL Puro

## Introducción a PostgreSQL y SQL
PostgreSQL es un sistema de gestión de bases de datos relacional y objeto-orientado, conocido por su robustez y extensibilidad. SQL (Structured Query Language) es el lenguaje estándar para interactuar con bases de datos relacionales.

### Historia de SQL
SQL fue desarrollado en la década de 1970 en IBM por Donald D. Chamberlin y Raymond F. Boyce. Desde entonces, ha evolucionado y se ha convertido en el estándar para la gestión de bases de datos relacionales.

## Descripción de la Base de Datos
La base de datos de este proyecto de e-commerce contiene las siguientes tablas principales:

- **users**: Almacena la información de los usuarios registrados en la plataforma.
- **products**: Almacena la información de los productos disponibles para la venta.

### Diagrama de Entidad-Relación (ERD)
Para más detalles sobre el diagrama de entidad-relación, consulta el archivo [ERD.md](./ERD.md).

### ¿Qué es una Tabla?
Una tabla en una base de datos es una colección de datos organizados en filas y columnas. Cada fila representa un registro único y cada columna representa un campo de datos.

### Tipos de Tablas
Existen varios tipos de tablas en una base de datos, incluyendo:

- **Tablas de Datos**: Almacenan datos principales, como usuarios y productos.
- **Tablas de Relación**: Gestionan relaciones entre otras tablas, como `product_categories` que relaciona productos y categorías.

### Tipos de Relaciones entre Tablas
Las relaciones entre tablas pueden ser:

- **Uno a Uno (1:1)**: Cada fila en una tabla está relacionada con una única fila en otra tabla.
- **Uno a Muchos (1:N)**: Una fila en una tabla está relacionada con múltiples filas en otra tabla.
- **Muchos a Muchos (N:M)**: Múltiples filas en una tabla están relacionadas con múltiples filas en otra tabla, gestionadas a través de una tabla intermedia.

### Tipos de Datos en PostgreSQL
PostgreSQL admite varios tipos de datos, incluyendo:

- **UUID**: Un identificador único universal. Ejemplo: `id UUID PRIMARY KEY DEFAULT uuid_generate_v4()`.
  - Ventajas: Garantiza unicidad global, útil en sistemas distribuidos, no revela información sobre el orden de inserción.
  - Desventajas: Ocupa más espacio (16 bytes), puede ser más lento en comparación con INTEGER debido a su tamaño.
- **INTEGER**: Un número entero. Ejemplo: `age INTEGER`.
  - Ventajas: Ocupa menos espacio (4 bytes), más rápido en comparación con UUID, fácil de leer y manejar.
  - Desventajas: Limitado a 2,147,483,647 valores únicos, puede revelar información sobre el orden de inserción.
- **SERIAL**: Un número entero que se incrementa automáticamente. Ejemplo: `id SERIAL PRIMARY KEY`.
- **VARCHAR(n)**: Una cadena de texto de longitud variable con un límite máximo de `n` caracteres. Ejemplo: `name VARCHAR(100)`.
- **TEXT**: Una cadena de texto de longitud variable sin límite máximo. Ejemplo: `description TEXT`.
- **BOOLEAN**: Un valor booleano (`TRUE` o `FALSE`). Ejemplo: `is_active BOOLEAN`.
- **DATE**: Una fecha (año, mes, día). Ejemplo: `birthdate DATE`.
- **TIMESTAMP**: Una marca de tiempo (fecha y hora). Ejemplo: `created_at TIMESTAMP`.
- **DECIMAL(p, s)**: Número decimal con `p` dígitos en total y `s` decimales.

### Claves Primarias y Foráneas
- **Clave Primaria (PK)**: Identificador único para cada fila en una tabla.
- **Clave Foránea (FK)**: Referencia a una clave primaria en otra tabla para establecer una relación entre tablas.

### Claves en Tablas Intermedias
Las tablas intermedias, como `product_categories`, utilizan claves compuestas como clave primaria, combinando dos o más claves foráneas.

### Criterios para Crear Tablas
Para evitar problemas con las claves foráneas, las tablas deben ser creadas en un orden específico. Primero se crean las tablas que no dependen de otras tablas (sin claves foráneas), y luego se crean las tablas que dependen de estas. Por ejemplo:

1. **Tablas sin claves foráneas**: `users`, `brands`, `categories`.
2. **Tablas con claves foráneas a las tablas anteriores**: `products` (depende de `brands`), `addresses` (depende de `users`).
3. **Tablas con claves foráneas a las tablas anteriores**: `orders` (depende de `users` y `addresses`).
4. **Tablas con claves foráneas a las tablas anteriores**: `order_items` (depende de `orders` y `products`), `product_categories` (depende de `products` y `categories`).
5. **Tablas con claves foráneas a las tablas anteriores**: `payment_methods` (depende de `users`), `reviews` (depende de `products` y `users`), `refunds` (depende de `order_items`).
6. **Tablas con claves foráneas a las tablas anteriores**: `purchase_history` (depende de `users` y `orders`).

### Comandos para Navegar por la Base de Datos
- **Listar Bases de Datos**: `\l`
- **Conectar a una Base de Datos**: `\c nombre_base_datos`
- **Listar Tablas**: `\dt`
- **Describir una Tabla**: `\d nombre_tabla`

### Comandos para Crear una Tabla
```sql
CREATE TABLE nombre_tabla (
  columna1 tipo_dato restricciones,
  columna2 tipo_dato restricciones,
  ...
);
```
#### Ejemplo de Creación de Tabla
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50),
  wallet DECIMAL(10, 2) DEFAULT 0.00
);
```
- `CREATE TABLE users`: Crea una tabla llamada `users`.
- `id UUID PRIMARY KEY DEFAULT uuid_generate_v4()`: Define la columna `id` como UUID, clave primaria, con un valor predeterminado generado por `uuid_generate_v4()`.
- `name VARCHAR(100)`: Define la columna `name` como una cadena de texto con un máximo de 100 caracteres.
- `email VARCHAR(100) UNIQUE NOT NULL`: Define la columna `email` como una cadena de texto única y no nula.
- `password VARCHAR(100) NOT NULL`: Define la columna `password` como una cadena de texto no nula.
- `role VARCHAR(50)`: Define la columna `role` como una cadena de texto con un máximo de 50 caracteres.
- `wallet DECIMAL(10, 2) DEFAULT 0.00`: Define la columna `wallet` como un número decimal con 10 dígitos en total y 2 decimales, con un valor predeterminado de 0.00.

### Comandos para Agregar Elementos en la Tabla
```sql
INSERT INTO nombre_tabla (columna1, columna2, ...) VALUES (valor1, valor2, ...);
```
#### Ejemplo de Inserción de Datos en una Tabla
```sql
INSERT INTO users (name, email, password, role, wallet) VALUES
('Juan Pérez', 'juan.perez@example.com', 'password123', 'cliente', 100.00),
('María López', 'maria.lopez@example.com', 'password456', 'cliente', 150.00);
```

### Identificador UUID
- **UUID (Identificador Único Universal)**: Es un identificador estándar utilizado para identificar de manera única información en sistemas distribuidos. Un UUID es un número de 128 bits que se representa como una cadena de 36 caracteres.
- **Generación de UUID en PostgreSQL**: Utiliza la extensión `uuid-ossp` y la función `uuid_generate_v4()`.
  - **Extensión `uuid-ossp`**: Es una extensión de PostgreSQL que proporciona funciones para generar UUIDs. Se debe habilitar con el comando `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`.
  - **Función `uuid_generate_v4()`**: Genera un UUID basado en la versión 4 del estándar UUID, que utiliza números aleatorios.

#### Ejemplo de Uso de UUID en una Tabla
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE ejemplo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(100)
);
```
- `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`: Habilita la extensión `uuid-ossp` para generar UUIDs.
- `CREATE TABLE ejemplo`: Crea una tabla llamada `ejemplo`.
- `id UUID PRIMARY KEY DEFAULT uuid_generate_v4()`: Define la columna `id` como UUID, clave primaria, con un valor predeterminado generado por `uuid_generate_v4()`.
- `nombre VARCHAR(100)`: Define la columna `nombre` como una cadena de texto con un máximo de 100 caracteres.

### Ejemplo de Inserción de Datos en una Tabla con UUID
```sql
INSERT INTO ejemplo (nombre) VALUES ('Ejemplo 1'), ('Ejemplo 2');
```

### Lista de Comandos Básicos

#### Entrar en una Base de Datos y Salir
- **Conectar a una Base de Datos**: `\c nombre_base_datos`
- **Salir de la Base de Datos**: `\q`

#### Entrar en una Tabla y Salir
- **Describir una Tabla**: `\d nombre_tabla`
- **Listar Tablas**: `\dt`

#### Agregar una Nueva Entrada en una Tabla con Todos los Datos
```sql
INSERT INTO nombre_tabla (columna1, columna2, columna3) VALUES (valor1, valor2, valor3);
```

#### Agregar una Nueva Entrada en una Tabla con Algunos Datos
```sql
INSERT INTO nombre_tabla (columna1, columna2) VALUES (valor1, valor2);
```


