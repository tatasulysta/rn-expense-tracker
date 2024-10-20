import React from "react";
import SelectInput, {
  SelectInputOption,
} from "../../../components/elements/input/select-input";
import useGetWalletByUser from "./use-get-wallet-by-user";
import { resetTime } from "../../../utils/date";
import { format, startOfMonth } from "date-fns";

export default function useMonthSelect(props: { userId: string }) {
  const [value, setValue] = React.useState<string>(
    startOfMonth(resetTime(new Date())).toISOString(),
  );
  const { wallets } = useGetWalletByUser(props);

  const monthOptions: SelectInputOption[] = React.useMemo(
    () =>
      wallets.map((item) => {
        const startMonth = item.date;

        return {
          label: format(startMonth, "MMM yyyy"),
          value: `${startMonth.toISOString()}`,
        };
      }),
    [wallets],
  );

  return {
    Component: (
      <SelectInput
        options={monthOptions}
        value={value}
        disabled={!monthOptions.length}
        placeholder={!monthOptions.length ? "No Data" : "Select Month"}
        onChange={(value) => setValue(value as string)}
      />
    ),
    value,
  };
}
