import { DATATYPES_ENDPOINT } from '../config';

export default (data) => {
  console.log('post.js', 'data', data);
  return fetch(DATATYPES_ENDPOINT, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
};
