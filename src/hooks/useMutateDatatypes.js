import React from 'react';
import { useQuery, useMutation } from 'react-query';

import { DATATYPES_ENDPOINT } from 'src/config';

const useMutateDatatypes = () => {
  return useMutation(`mutateion-data-types`, async (pages = 0, limit = 0) => {
    return fetch(DATATYPES_ENDPOINT).then((res) => res.json());
  });
};

export default useMutateDatatypes;
