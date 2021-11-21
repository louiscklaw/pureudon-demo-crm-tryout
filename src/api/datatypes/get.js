import { DATATYPES_ENDPOINT } from '../config';

export default () => {
  return fetch(DATATYPES_ENDPOINT);
};
