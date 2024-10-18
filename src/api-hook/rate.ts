import useFetch from "../hooks/use-fetch";
import { customFetch } from "./common";
import { EXCHANGE_RATE_API_KEY } from "@env";

interface RateRespondModel {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: { [key: string]: number };
}

export function useGetRates(baseRate: string) {
  return useFetch<RateRespondModel>({
    uri: `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/${baseRate}`,
  });
}
