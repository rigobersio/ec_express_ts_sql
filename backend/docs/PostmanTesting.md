# Pruebas con Postman

Este documento proporciona instrucciones detalladas para realizar pruebas de la API utilizando Postman.

## Requisitos Previos
- Asegúrate de que el servidor Express esté en funcionamiento.
- Asegúrate de tener Postman instalado en tu máquina.

## Pruebas de la API

### Obtener Todos los Usuarios
1. Crea una nueva solicitud en la colección.
2. Configura la solicitud como `GET`.
3. Ingresa la URL de la solicitud: `http://localhost:3000/users/get`.
4. Haz clic en "Send" para enviar la solicitud.
5. Deberías recibir una respuesta con todos los usuarios de la tabla `users`.

### Obtener un Usuario por ID
1. Crea una nueva solicitud en la colección.
2. Configura la solicitud como `GET`.
3. Ingresa la URL de la solicitud: `http://localhost:3000/users/get/:id`.
   - Reemplaza `:id` con el ID del usuario que deseas obtener (ejemplo: c82051cc-da60-47d1-a5fb-ef3e8fc050c2).
4. Haz clic en "Send" para enviar la solicitud.
5. Deberías recibir una respuesta con los detalles del usuario especificado.

### Obtener un Usuario por Correo Electrónico
1. Crea una nueva solicitud en la colección.
2. Configura la solicitud como `GET`.
3. Ingresa la URL de la solicitud: `http://localhost:3000/users/get/email/:email`.
   - Reemplaza `:email` con el correo electrónico del usuario que deseas obtener (ejemplo: adminalfa@adminalfa.com).
4. Haz clic en "Send" para enviar la solicitud.
5. Deberías recibir una respuesta con los detalles del usuario especificado.

### Crear un Nuevo Usuario
1. Crea una nueva solicitud en la colección.
2. Configura la solicitud como `POST`.
3. Ingresa la URL de la solicitud: `http://localhost:3000/users/post`.
4. Ve a la pestaña "Body" y selecciona "raw" y "JSON".
5. Ingresa el siguiente JSON en el cuerpo de la solicitud:
    ```json
    {
      "name": "Nuevo Usuario",
      "email": "nuevo.usuario@example.com",
      "password": "password123",
      "role": "cliente",
      "wallet": 50.00
    }
    ```

    se creo un admin para pruebas primarias:

    ```json
    {
    "message": "User created",
    "result": {
        "id": "b7dd5496-421e-4699-b74a-d2b016f8c0f2",
        "name": "adminalfa",
        "email": "adminalfa@adminalfa.com",
        "password": "admin1234",
        "role": "admin",
        "wallet": "10000.00"
    }
}
    ```
6. Haz clic en "Send" para enviar la solicitud.
7. Deberías recibir una respuesta con los detalles del usuario creado.

### Actualizar un Usuario
1. Crea una nueva solicitud en la colección.
2. Configura la solicitud como `PUT`.
3. Ingresa la URL de la solicitud: `http://localhost:3000/users/put/:id`.
   - Reemplaza `:id` con el ID del usuario que deseas actualizar.
4. Ve a la pestaña "Body" y selecciona "raw" y "JSON".
5. Ingresa el siguiente JSON en el cuerpo de la solicitud:
    ```json
    {
      "name": "Usuario Actualizado",
      "email": "usuario.actualizado@example.com",
      "password": "newpassword123",
      "role": "admin",
      "wallet": 100.00
    }
    ```
6. Haz clic en "Send" para enviar la solicitud.
7. Deberías recibir una respuesta con los detalles del usuario actualizado.

### Eliminar un Usuario
1. Crea una nueva solicitud en la colección.
2. Configura la solicitud como `DELETE`.
3. Ingresa la URL de la solicitud: `http://localhost:3000/users/delete/:id`.
   - Reemplaza `:id` con el ID del usuario que deseas eliminar.
4. Haz clic en "Send" para enviar la solicitud.
5. Deberías recibir una respuesta confirmando que el usuario ha sido eliminado.

## Conclusión
Con estas instrucciones, puedes realizar pruebas de la API utilizando Postman. Asegúrate de que el servidor esté en funcionamiento y de que las URLs y los datos sean correctos para obtener los resultados esperados.

### Nota
Al crear nuevas entradas desde una terminal y eventualmente otros medios es posible que no se registren bien caracteres que no sean propios del inglés.
