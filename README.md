## Description

[Nest](https://github.com/nestjs/nest) API with Authentication, MySql, Swagger and GraphQl starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn dev

# watch mode
$ yarn debug

# production mode
$ yarn prod
```

## Access API

[http://localhost:8080](http://localhost:8080)  Here you'll get the message `Hello World!`

## Access Swagger documentation

[http://localhost:8080/api](http://localhost:8080/api)  Here you'll be able to test the API's endpoints

#### In order to debug, if you're using VSCode you'll just need to enable Auto Attach

`CMD+Shift+P => Debug: Toggle Auto Attach`

## Stay in touch

- Website - [almarto](https://github.com/almarto)
- Twitter - [@martoalber](https://twitter.com/martoalber)

## License

nestjs-skeleton is [MIT licensed](LICENSE).

## TODO

- Add authentication
- Add validation to entities
- Manage Errors (404: entity not found, 401: auth error at high layer)
- Add Plop to create new entities (CRUD operation for that entity, [Controller, Service, DTO])
  - Plop will be able to create new entities which requires or not Auth.
- Add GraphQl
