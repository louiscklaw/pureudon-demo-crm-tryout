const request = require('request');
const _ = require('lodash');
const { isEqual, isNull } = require('lodash');

request('https://pureudon.com/demo/jobbook-laravel/api/datatypes/list', function(error, response, body) {
  let test_topic = 'test getRestId with active user_id';
  let bloat_body = JSON.parse(body);
  console.assert(Object.keys(bloat_body).includes('data'), 'return not contain data');
  console.assert(Object.keys(bloat_body.data).length > 1, 'return body.data not a list');
});
