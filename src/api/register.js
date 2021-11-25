import { API_ENDPOINT } from '../config';

export default ({ email, password }) => {
  return fetch(API_ENDPOINT, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ email, password }),
  });
};
