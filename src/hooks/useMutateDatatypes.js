import React from 'react';
import { useQuery, useMutation } from 'react-query';

import { DATATYPES_ENDPOINT } from 'src/config';

const useMutateDatatypes = () => {
  return useMutation(`mutateion-data-types`, async (pageIndex = 1, pageSize = 10) => {
    return fetch(DATATYPES_ENDPOINT).then((res) => res.json());
  });
};

export default useMutateDatatypes;
