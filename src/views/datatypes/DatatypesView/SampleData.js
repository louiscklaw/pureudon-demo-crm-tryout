import React from "react";
const API_ENDPOINT_BASE = "http://localhost/jobbook-laravel/api";

export default function SampleData({ setData, setIsLoading }) {
  React.useEffect(() => {
    fetch(`${API_ENDPOINT_BASE}/datatypes`)
      .then((res) => res.json())
      .then((res_json) => {
        console.log("SampleData", res_json.data);
        setData(res_json.data);
        setIsLoading(false);
      });
  }, []);

  return <></>;
}
