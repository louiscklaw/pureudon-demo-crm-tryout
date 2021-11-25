const express = require('express');
var cors = require('cors');

const datatypes = require('./response_jsons/datatypes.json');
const datatypes_list = require('./response_jsons/datatypes/list.json');
const datatypes_count = require('./response_jsons/datatypes/count.json');

const app = express();
const port = 3001;

app.use(cors());

app.get('/jobbook-laravel/api/datatypes/count', (req, res) => {
  res.status(200).send(datatypes_count);
});

app.get('/jobbook-laravel/api/datatypes/list', (req, res) => {
  res.status(200).send(datatypes_list);
});

app.get('/jobbook-laravel/api/datatypes', (req, res) => {
  res.status(200).send(datatypes);
});

app.post('/jobbook-laravel/api/login', (req, res) => {
  res.status(200).send({
    access_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcHVyZXVkb24uY29tXC9kZW1vXC9qb2Jib29rLWxhcmF2ZWxcL2FwaVwvbG9naW4iLCJpYXQiOjE2Mzc4NjE4MjEsImV4cCI6MTYzNzg2NTQyMSwibmJmIjoxNjM3ODYxODIxLCJqdGkiOiJORTVPN3FxNmdjZ2RsTUppIiwic3ViIjo0LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.V3d4VNrMiwYHQ9xD1bMUYjgUZoBwsN-RIhpP7-kPY8o',
    token_type: 'bearer',
    expires_in: 3600,
  });
});

app.get('/helloworld', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
