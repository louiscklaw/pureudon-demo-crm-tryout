import { API_ENDPOINT } from './config';

export default ({ email, password }) => {
  console.log('login.js', { email, password });
  return fetch(`${API_ENDPOINT}/login?email=${email}&password=${password}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
};
