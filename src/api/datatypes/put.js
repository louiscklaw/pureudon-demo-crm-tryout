import { DATATYPES_ENDPOINT } from '../config';

export default (data) => {
  return fetch(DATATYPES_ENDPOINT, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
};
