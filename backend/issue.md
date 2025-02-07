# Integración de PostgreSQL con SQL Puro

## 📝 Descripción:
Configurar PostgreSQL en el backend utilizando consultas SQL directas. Se deben definir las tablas, establecer la conexión con la base de datos y aplicar migraciones manualmente.

### ✅ Tareas:

- Instalar **pg** y **dotenv** para manejar la conexión con PostgreSQL.
- Configurar la conexión a PostgreSQL en **.env**.
- Crear un módulo de base de datos en **src/database/db.ts** para manejar la conexión.
- Escribir los scripts SQL para la creación de las tablas necesarias en **src/database/migrations/**.
- Ejecutar los scripts SQL manualmente o desde el código.
- Trabajar en la rama **express-SQL**.
- Dejar registro de los cambios en **READMEExpress.md**.

### 🔄 Instrucciones de Git

- Actualiza tu rama main `git pull origin main`.
- Cambia a la rama de trabajo `git checkout express-SQL`.
- Recuerda que la rama **express-SQL** no está actualizada y por ende es necesario un merge `git merge main`.
- Antes de cada *push* y sobre todo antes del push para el *PR* actualiza main para visualizar cambios y realiza otro `git merge main` para resolver cualquier conflicto de manera local antes de hacer el último `git push origin express-SQL`.

### 🚀 Criterios de finalización:

- Se han definido y creado las tablas en **PostgreSQL**.
- La conexión con **PostgreSQL** funciona correctamente desde Express.
- Se pueden ejecutar queries de prueba sin errores.
- Se realizan pruebas con **Postman** o similar.
- El archivo **READMEEXPRESS.md** se actualizó.

### 📌 Notas adicionales:

- Se deben ejecutar las consultas SQL en PostgreSQL antes de iniciar la aplicación.
- Si es posible, incluir un archivo .sql con los scripts de creación de tablas en la carpeta migrations/.
- Si surgen dudas o problemas, comentarlo antes de hacer el PR.


####🚀 ¡Manos a la obra! 🔥