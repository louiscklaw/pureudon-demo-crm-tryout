import React from 'react';

import { DATATYPES_ENDPOINT } from 'src/api/config';

export default function SampleData({ setData, setIsLoading }) {
  React.useEffect(() => {
    fetch(DATATYPES_ENDPOINT)
      .then((res) => res.json())
      .then((res_json) => {
        console.log('SampleData', res_json.data);
        setData(res_json.data);
        setIsLoading(false);
      });
  }, []);

  return <></>;
}
