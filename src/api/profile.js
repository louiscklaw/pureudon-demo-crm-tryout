import { DATATYPES_ENDPOINT } from '../config';

export default (id_to_edit) => {
  return fetch(`${DATATYPES_ENDPOINT}/${id_to_edit}`);
};
