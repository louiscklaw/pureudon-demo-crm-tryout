import { DATATYPES_ENDPOINT } from '../config';

export default (id_to_delete) => {
  return fetch(`${DATATYPES_ENDPOINT}/${id_to_delete}`, { method: 'DELETE' });
};
