import { useQuery } from 'react-query';

import datatypes_count from 'src/api/datatypes/count';

export default () => {
  return useQuery('datatypes-count', () => datatypes_count().then((res) => res.json()));
};
