# Sample RESTful server for test

## Dependencies

- `pouchdb`
- `express`
- `cors`

## Installation 

```
$ git clone https://github.com/siteslave/rest-server.git

$ cd rest-server

$ npm i

$ npm start
```

Web url: `http://localhost:3000`

## Usage


`GET /users`  --> get all users

`GET /users/{id}`  --> get detail

`POST /users`  --> create user, params: `username`, `name`, `email`, `group_id`

`PUT /users` --> update user, params: `id`, `name`, `email`, `group_id`

`DELETE /users/{id}` --> remove user

`GET /groups` --> get all groups
