const request = require('request');
const _ = require('lodash');
const { isEqual, isNull } = require('lodash');

const chalk = require('chalk');

request('https://pureudon.com/demo/jobbook-laravel/api/datatypes/1', function(error, response, body) {
  let test_topic = 'test getRestId with active user_id';
  console.assert(
    isEqual(JSON.parse(body), {
      data: {
        id: 1,
        varchartype: 'put json',
        inttype: 141,
        yeartype: '2027',
        datetype: '2027-07-07',
        datetimetype: '2027-07-07 07:07:07',
      },
    }),
    'single record get request failed'
  );
});
