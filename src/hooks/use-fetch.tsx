import React from "react";
import { customFetch } from "../api-hook/common";

interface Props {
  uri: string;
}
export default function useFetch<T>(props: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<T | null>(null);

  const [error, setError] = React.useState<string | null>(null);

  const init = async () => {
    try {
      const res = await customFetch({
        uri: props.uri,
      });
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (e) {
      setError("An error occurred. Awkward..");
    }
  };
  React.useEffect(() => {
    setLoading(true);
    setError(null);
    init();
  }, []);

  return { error, loading, data };
}
