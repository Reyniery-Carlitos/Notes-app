# BACKEND NOTES APP

## Acerca del proyecto

Prueba tecnica - aplicacion de notas

## Estructura de carpetas

```
|--- node_modules
|--- src
|     |--- base
|     |     |--- base.entity.ts
|     |     |--- base.repository.ts
|     |--- category
|     |     |--- dtos
|     |     |     |--- category.dtos.ts
|     |     |--- category.controller.ts
|     |     |--- category.entity.ts
|     |     |--- category.repository.ts
|     |     |--- category.router.ts
|     |     |--- category.service.ts
|     |--- login
|     |     |--- dtos
|     |     |     |--- login.dtos.ts
|     |     |--- login.controller.ts
|     |     |--- login.router.ts
|     |     |--- login.service.ts
|     |--- middlewares
|     |     |--- validarJWT.ts
|     |--- note
|     |     |--- dtos
|     |     |     |--- note.dtos.ts
|     |     |--- note.controller.ts
|     |     |--- note.entity.ts
|     |     |--- note.repository.ts
|     |     |--- note.router.ts
|     |     |--- note.service.ts
|     |--- tag
|     |     |--- dtos
|     |     |     |--- tag.dtos.ts
|     |     |--- tag.controller.ts
|     |     |--- tag.entity.ts
|     |     |--- tag.repository.ts
|     |     |--- tag.router.ts
|     |     |--- tag.service.ts
|     |--- user
|     |     |--- dtos
|     |     |     |--- user.dtos.ts
|     |     |--- user.controller.ts
|     |     |--- user.entity.ts
|     |     |--- user.repository.ts
|     |     |--- user.router.ts
|     |     |--- user.service.ts
|     |--- utils
|     |     |--- interfaces
|     |     |     |--- result.interfaces.ts
|     |     |--- functions.ts
|     |--- app.ts
|     |--- typeorm-config.ts
|--- README.md
|--- tsconfig.json
```

## Pruebas API

- **Users**
  - Crear: POST http://localhost:3000/api/v1/users/

    JSON con los siguientes datos
    ```
      {
        "username": string,
        "email": string,
        "password": string,
        "confirmPassword": string
      }
    ```

- **Login**: POST http://localhost:3000/api/v1/login
  
  JSON Con los siguientes datos

  ```
    {
      "email": string,
      "password": string
    }
  ```

  Usuario para pruebas

  ```
    {
      "email": "carlos@gmail.com",
      "password": "pass1234"
    }
  ```

- **Notes**
  - Crear: POST http://localhost:3000/api/v1/notes/

    JSON Con los siguientes datos

    ```
      {
        "title": string,
        "description": string,
        "date": 'YYYY-MM-DD',
        "isArchived": boolean,
        "isActive": boolean,
        "categoryId": number,
        "userId": number
      }
    ```

  - Actualizar: PUT http://localhost:3000/api/v1/notes/:id

    JSON Con los siguientes datos

    ```
      {
        "title": string,
        "description": string,
        "date": 'YYYY-MM-DD',
        "isArchived": boolean,
        "isActive": boolean,
        "categoryId": number,
        "userId": number
      }
    ```

  - Eliminar: DELETE http://localhost:3000/api/v1/notes/:id

    id = un id de una nota valida

  - Obtener todas las notas por id usuario: GET http://localhost:3000/api/v1/notes/user/:id
  
    id = un id de un usuario valido

  - Obtener todas las notas por id categoria: GET http://localhost:3000/api/v1/notes/category/:id
  
    id = un id de una categoria valida

  - Obtener nota por ID: GET http://localhost:3000/api/v1/notes/:id

    id = un id de una nota valida

  - Obtener notas por titulo: GET http://localhost:3000/api/v1/notes?title=someTitle

    someTitle = Algun titulo a buscar

- **Tags**
  - Crear: POST http://localhost:3000/api/v1/tags/

    JSON Con los siguientes datos

    ```
      {
        "name": string,
        "noteId": number
      }
    ```

  - Actualizar: PUT http://localhost:3000/api/v1/tags/:id

    JSON Con los siguientes datos

    ```
      {
        "name": string,
        "noteId": number
      }
    ```

  - Eliminar: DELETE http://localhost:3000/api/v1/tags/:id

- **Categories**
  - Crear: POST http://localhost:3000/api/v1/categories/

    JSON Con los siguientes datos

    ```
      {
        "name": string
      }
    ```

  - Actualizar: PUT http://localhost:3000/api/v1/categories/:id

    JSON Con los siguientes datos

    ```
      {
        "name": string
      }
    ```

  - Eliminar: DELETE http://localhost:3000/api/v1/categories/:id

  - Obtener todas las categorias: GET http://localhost:3000/api/v1/categories/


## Tecnologias

- Nodejs - Version 20.9.0
- Expressjs - Version 4.18.2
- Typescript - Version 5.3.3
- MariaDB - Version 11.2.2

## Scripts

#### `npm run dev`

Levantar el proyecto en modo desarrollo