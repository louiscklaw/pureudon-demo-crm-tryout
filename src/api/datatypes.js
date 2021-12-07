import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';

import { DATATYPES_ENDPOINT } from './config';

const useQueryDatatypes = (menu_id) => {
  return useQuery('api-datatypes-list', () => {
    return fetch(DATATYPES_ENDPOINT).then((res) => res.json());
  });
};

export default useQueryDatatypes;
