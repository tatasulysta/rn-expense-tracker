import React from "react";
import SelectInput, {
  SelectInputOption,
} from "../../../components/elements/input/select-input";
import useGetWalletByUser from "./use-get-wallet-by-user";
import { resetTime } from "../../../utils/date";
import { startOfYear } from "date-fns";

export default function useYearSelect(props: { userId: string }) {
  const [value, setValue] = React.useState<string>(
    startOfYear(resetTime(new Date())).toISOString(),
  );
  const { wallets } = useGetWalletByUser(props);
  const yearOptions: SelectInputOption[] = React.useMemo(() => {
    const marker: number[] = [];
    const options: SelectInputOption[] = [];
    wallets.forEach((item) => {
      const year = item.date.getFullYear();
      if (!marker.includes(year)) {
        options.push({
          value: startOfYear(new Date(year, 1, 1, 0, 0, 0)).toISOString(),
          label: year.toString(),
        });
        marker.push(year);
      }
    });
    return options;
  }, [wallets]);

  return {
    Component: (
      <SelectInput
        options={yearOptions}
        value={value}
        disabled={!yearOptions.length}
        placeholder={!yearOptions.length ? "No Data" : "Select Month"}
        onChange={(value) => setValue(value as string)}
      />
    ),
    value,
  };
}
