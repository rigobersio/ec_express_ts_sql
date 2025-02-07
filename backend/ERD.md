# Análisis del Diagrama de Entidad-Relación (ERD)

## Introducción
En este documento se analizará en profundidad el diagrama de entidad-relación (ERD) para la aplicación de e-commerce. Se considerarán aspectos importantes como la encriptación de contraseñas, tipos de usuarios, historial de compras, dirección de despacho, y escalabilidad.

## Diagrama de Entidad-Relación (ERD)
El ERD inicial para la aplicación de e-commerce es el siguiente:

```plaintext
+-----------------+       +-----------------+
|     users       |       |    products     |
+-----------------+       +-----------------+
| id (PK)         |       | id (PK)         |
| name            |       | name            |
| email           |       | description     |
| password        |       | price           |
| role            |       | stock           |
| wallet          |       | discount        |
+-----------------+       +-----------------+
                          | brand_id (FK)   |
                          +-----------------+
```

## Análisis de Entidades y Relaciones
### Tabla `users`
- **id**: Identificador único del usuario (Primary Key).
- **name**: Nombre del usuario.
- **email**: Correo electrónico del usuario (único).
- **password**: Contraseña del usuario (debe estar encriptada).
- **role**: Rol del usuario (cliente, administrador, etc.).
- **wallet**: Monedero del usuario para almacenar saldo.

### Tabla `products`
- **id**: Identificador único del producto (Primary Key).
- **name**: Nombre del producto.
- **description**: Descripción del producto.
- **price**: Precio del producto.
- **stock**: Cantidad de productos disponibles en inventario.
- **discount**: Porcentaje de descuento del producto.
- **brand_id**: Identificador de la marca del producto (Foreign Key).

## Consideraciones Adicionales
### Encriptación de Contraseñas
Es fundamental que las contraseñas de los usuarios estén encriptadas para garantizar la seguridad. Se recomienda utilizar un algoritmo de hashing seguro como bcrypt.

### Tipos de Usuarios
Es posible que se necesiten diferentes tipos de usuarios, como administradores y clientes. Esto se puede lograr añadiendo un campo `role` en la tabla `users`.

### Historial de Compras
Para almacenar el historial de compras de los usuarios, se puede crear una tabla `purchase_history` que registre cada compra realizada.

### Dirección de Despacho
Para almacenar las direcciones de despacho de los usuarios, se puede crear una tabla `addresses` que esté relacionada con la tabla `users`.

### Escalabilidad
Es importante diseñar la base de datos de manera que pueda escalarse fácilmente en el futuro. Esto incluye considerar la posibilidad de añadir nuevas funcionalidades como un sistema de devolución de productos o dineros.

## Diagrama de Entidad-Relación (ERD) Mejorado

```plaintext
+-----------------+       +-----------------+       +-----------------+
|     users       |       |    products     |       |    orders       |
+-----------------+       +-----------------+       +-----------------+
| id (PK)         |       | id (PK)         |       | id (PK)         |
| name            |       | name            |       | user_id (FK)    |
| email           |       | description     |       | status          |
| password        |       | price           |       | total_price     |
| role            |       | stock           |       | order_date      |
| wallet          |       | discount        |       | address_id (FK) |
+-----------------+       | brand_id (FK)   |       +-----------------+
                          | image_urls      |
                          +-----------------+

+-----------------+       +-----------------+       +-----------------+
|   addresses     |       | order_items     |       |   categories    |
+-----------------+       +-----------------+       +-----------------+
| id (PK)         |       | id (PK)         |       | id (PK)         |
| user_id (FK)    |       | order_id (FK)   |       | name            |
| address_line1   |       | product_id (FK) |       | description     |
| address_line2   |       | quantity        |       +-----------------+
| city            |       | unit_price      |
| state           |       | total_price     |
| postal_code     |       +-----------------+
| country         |
| address_type    |
+-----------------+

+-----------------+       +-----------------+       +-----------------+
| payment_methods |       |   reviews       |       |   refunds       |
+-----------------+       +-----------------+       +-----------------+
| id (PK)         |       | id (PK)         |       | id (PK)         |
| user_id (FK)    |       | product_id (FK) |       | order_item_id (FK) |
| type            |       | user_id (FK)    |       | amount          |
| provider        |       | rating          |       | reason          |
| account_number  |       | comment         |       | refund_date     |
+-----------------+       +-----------------+       | returned        |
                                                    | refund_percent  |
                                                    +-----------------+

+-----------------+
|    brands       |
+-----------------+
| id (PK)         |
| name            |
| description     |
+-----------------+

+-----------------+
| product_categories |
+-----------------+
| product_id (FK) |
| category_id (FK)|
+-----------------+

+-----------------+
| purchase_history |
+-----------------+
| id (PK)          |
| user_id (FK)     |
| order_id (FK)    |
| purchase_date    |
| total_amount     |
+-----------------+
```

### Orden de Creación de las Tablas
Para evitar problemas con las claves foráneas, las tablas deben ser creadas en el siguiente orden:

1. `users`
2. `brands`
3. `products`
4. `addresses`
5. `orders`
6. `order_items`
7. `categories`
8. `product_categories`
9. `payment_methods`
10. `reviews`
11. `refunds`
12. `purchase_history`

### Explicación de las Relaciones
- **users**: Cada usuario tiene un `id` único, un `name`, un `email` único, un `password` encriptado, un `role` y un `wallet`.
- **products**: Cada producto tiene un `id` único, un `name`, una `description`, un `price`, un `stock`, un `discount`, un `brand_id` que referencia a la tabla `brands` y `image_urls`.
- **orders**: Cada orden tiene un `id` único, un `user_id` que referencia a la tabla `users`, un `status`, un `total_price`, una `order_date` y un `address_id` que referencia a la tabla `addresses`.
- **addresses**: Cada dirección tiene un `id` único, un `user_id` que referencia a la tabla `users`, un `address_line1`, un `address_line2`, una `city`, un `state`, un `postal_code`, un `country` y un `address_type`.
- **order_items**: Cada ítem de orden tiene un `id` único, un `order_id` que referencia a la tabla `orders`, un `product_id` que referencia a la tabla `products`, una `quantity`, un `unit_price` y un `total_price`.
- **categories**: Cada categoría tiene un `id` único, un `name` y una `description`.
- **payment_methods**: Cada método de pago tiene un `id` único, un `user_id` que referencia a la tabla `users`, un `type`, un `provider` y un `account_number`.
- **reviews**: Cada evaluación tiene un `id` único, un `product_id` que referencia a la tabla `products`, un `user_id` que referencia a la tabla `users`, un `rating` y un `comment`.
- **refunds**: Cada devolución tiene un `id` único, un `order_item_id` que referencia a la tabla `order_items`, un `amount`, un `reason`, una `refund_date`, un `returned` (indica si el producto fue devuelto) y un `refund_percent` (porcentaje del reembolso).
- **brands**: Cada marca tiene un `id` único, un `name` y una `description`.
- **product_categories**: Tabla intermedia para la relación muchos a muchos entre `products` y `categories`. Contiene `product_id` que referencia a `id` en la tabla `products` y `category_id` que referencia a `id` en la tabla `categories`.
- **purchase_history**: Cada registro de historial de compras tiene un `id` único, un `user_id` que referencia a la tabla `users`, un `order_id` que referencia a la tabla `orders`, una `purchase_date` y un `total_amount`.

### Relaciones entre las Tablas
- **users y orders**: Un usuario puede tener múltiples órdenes. La relación es uno a muchos (1:N). La tabla `orders` tiene una clave foránea `user_id` que referencia a `id` en la tabla `users`.
- **orders y order_items**: Una orden puede contener múltiples ítems de orden. La relación es uno a muchos (1:N). La tabla `order_items` tiene una clave foránea `order_id` que referencia a `id` en la tabla `orders`.
- **products y order_items**: Un producto puede estar en múltiples ítems de orden. La relación es uno a muchos (1:N). La tabla `order_items` tiene una clave foránea `product_id` que referencia a `id` en la tabla `products`.
- **users y addresses**: Un usuario puede tener múltiples direcciones. La relación es uno a muchos (1:N). La tabla `addresses` tiene una clave foránea `user_id` que referencia a `id` en la tabla `users`.
- **products y categories**: Un producto puede pertenecer a múltiples categorías. La relación es muchos a muchos (N:M). La tabla intermedia `product_categories` tiene claves foráneas `product_id` y `category_id` que referencian a `id` en las tablas `products` y `categories` respectivamente.
- **users y payment_methods**: Un usuario puede tener múltiples métodos de pago. La relación es uno a muchos (1:N). La tabla `payment_methods` tiene una clave foránea `user_id` que referencia a `id` en la tabla `users`.
- **products y reviews**: Un producto puede tener múltiples evaluaciones. La relación es uno a muchos (1:N). La tabla `reviews` tiene una clave foránea `product_id` que referencia a `id` en la tabla `products`.
- **users y reviews**: Un usuario puede escribir múltiples evaluaciones. La relación es uno a muchos (1:N). La tabla `reviews` tiene una clave foránea `user_id` que referencia a `id` en la tabla `users`.
- **orders y refunds**: Una orden puede tener múltiples devoluciones. La relación es uno a muchos (1:N). La tabla `refunds` tiene una clave foránea `order_item_id` que referencia a `id` en la tabla `order_items`.
- **products y brands**: Un producto pertenece a una marca. La relación es muchos a uno (N:1). La tabla `products` tiene una clave foránea `brand_id` que referencia a `id` en la tabla `brands`.
- **users y purchase_history**: Un usuario puede tener múltiples registros de historial de compras. La relación es uno a muchos (1:N). La tabla `purchase_history` tiene una clave foránea `user_id` que referencia a `id` en la tabla `users`.
- **orders y purchase_history**: Una orden puede tener múltiples registros de historial de compras. La relación es uno a muchos (1:N). La tabla `purchase_history` tiene una clave foránea `order_id` que referencia a `id` en la tabla `orders`.
