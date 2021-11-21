import { API_ENDPOINT_BASE } from 'src/views/datatypes/DatatypesView/config';

export default () => {
  return fetch(`${API_ENDPOINT_BASE}/datatypes`);
};
