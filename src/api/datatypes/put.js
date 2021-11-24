import { DATATYPES_ENDPOINT } from '../config';

export default ({ id_to_edit, data }) => {
  return fetch(`${DATATYPES_ENDPOINT}/${id_to_edit}`, {
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
