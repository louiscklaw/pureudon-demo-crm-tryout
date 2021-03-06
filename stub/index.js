const namor = require('namor');
var faker = require('faker');

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

app.get('/jobbook-laravel/api/datatypes/search', (req, res) => {
  res.status(200).send(datatypes_count);
});

app.get('/jobbook-laravel/api/datatypes/list', (req, res) => {
  res.status(200).send(datatypes_list);
});

app.get('/jobbook-laravel/api/datatypes', (req, res) => {
  console.log('datatypes', 'req', req.query.genRecord);
  if (req.query.genRecord) {
    let data_array = Array(parseInt(req.query.genRecord))
      .fill({})
      .map((o, idx) => {
        return {
          id: idx,
          hello: 'world',
          varchartype: faker.name.findName(),
          inttype: idx,
          inttype1: Math.floor(Math.random() * 30),
          inttype2: Math.floor(Math.random() * 100),
          yeartype: faker.date.past().toDateString(),
          datetype: faker.date.past(),
          datetimetype: faker.date.past().setUTCFullYear(),
        };
      });

    res.status(200).send({
      data: [...data_array],
      links: {
        first: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=1',
        last: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=7',
        prev: null,
        next: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=2',
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 7,
        links: [
          { url: null, label: '&laquo; Previous', active: false },
          { url: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=1', label: '1', active: true },
          { url: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=2', label: '2', active: false },
          { url: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=3', label: '3', active: false },
          { url: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=4', label: '4', active: false },
          { url: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=5', label: '5', active: false },
          { url: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=6', label: '6', active: false },
          { url: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=7', label: '7', active: false },
          {
            url: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes?page=2',
            label: 'Next &raquo;',
            active: false,
          },
        ],
        path: 'https://pureudon.com/demo/jobbook-laravel/api/datatypes',
        per_page: 10,
        to: 10,
        total: 67,
      },
    });
  } else {
    res.status(200).send(datatypes);
  }
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
