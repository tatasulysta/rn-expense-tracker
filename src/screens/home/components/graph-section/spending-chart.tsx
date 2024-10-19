import React from "react";
import { useRealm } from "../../../../hooks/use-realm";
import { useCredential } from "../../../../hooks/use-credential";
import useMonthSelect from "../../utils/use-month-select";
import { resetTime } from "../../../../utils/date";
import { endOfMonth, endOfYear } from "date-fns";
import { Mutation } from "../../../../store/auth.schema";
import useBreakdownMutation, {
  generateMonthRange,
  useBreakdownMutationByDate,
} from "../../utils/use-breakdown-mutation";
import useYearSelect from "../../utils/use-year-select";
import { StyledText, StyledView } from "../../../../components/common";
import Badge from "./badge";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { GRAPH_CONFIG } from "../../utils/graph-color";
import DefaultScrollView from "../../../../components/common/scroll-view";

export default function SpendingChart() {
  const realm = useRealm();
  const { credential } = useCredential();
  const { Component, value: startOfMonth } = useMonthSelect();
  const { Component: YearComponent, value: year } = useYearSelect();
  const [type, setType] = React.useState<"monthly" | "weekly">("monthly");
  const [mutations, setMutations] = React.useState<Mutation[]>([]);
  const uid = `${credential?.user?._id}`;

  React.useEffect(() => {
    if (realm.mutation) {
      const mutationData = realm.mutation?.objects("Mutation");

      if (type === "weekly") {
        const _startOfMonth = resetTime(new Date(startOfMonth));

        const eom = resetTime(endOfMonth(_startOfMonth));
        mutationData.filtered(
          `userId == $0 && transactionAt >= $1 && transactionAt <= $2`,
          uid,
          _startOfMonth,
          eom,
        );
      } else {
        const foy = new Date(year);
        const eoy = resetTime(endOfYear(foy));
        mutationData.filtered(
          `userId == $0 && transactionAt >= $1 && transactionAt <= $2`,
          uid,
          foy,
          eoy,
        );
      }

      const _wallets = (mutationData || []) as unknown as Mutation[];
      setMutations([..._wallets]);

      const listener = () => setMutations([..._wallets]);

      mutationData.addListener(listener);
      return () => mutationData.removeListener(listener);
    }
  }, [realm.wallet, startOfMonth, type, year]);

  const { mutationGroup } = useBreakdownMutationByDate({
    year: new Date(year).getFullYear(),
    mutations,
    weekly: new Date(startOfMonth),
  });

  return (
    <StyledView className="gap-y-3">
      <StyledView>
        <StyledView className="flex flex-row gap-x-1 mb-2" style={{ gap: 8 }}>
          <Badge
            value="monthly"
            state={type}
            onPress={() => setType("monthly")}
          >
            Monthly
          </Badge>
          <Badge value="weekly" state={type} onPress={() => setType("weekly")}>
            Weekly
          </Badge>
        </StyledView>
      </StyledView>
      {type === "weekly" ? Component : YearComponent}
      <DefaultScrollView horizontal>
        <LineChart
          data={{
            labels: (type === "monthly"
              ? mutationGroup.group
              : mutationGroup.groupWeek
            ).map((m) => m.label),
            datasets: [
              {
                data: (type === "monthly"
                  ? mutationGroup.group
                  : mutationGroup.groupWeek
                ).map((m) => m.total),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2, // optional
              },
            ],
            legend: ["Spending"], // optional
          }}
          width={Dimensions.get("window").width}
          bezier
          height={220}
          chartConfig={GRAPH_CONFIG}
        />
      </DefaultScrollView>
      <StyledView className="flex flex-1">
        {Object.keys(mutationGroup.category.datas).map((categoryKey) => (
          <StyledText>
            {`${categoryKey.split("|")[0]} ${(
              (mutationGroup.category.datas[categoryKey].reduce(
                (prev, cur) => prev + cur.amount,
                0,
              ) /
                mutationGroup.category.total) *
              100
            ).toFixed(2)}%`}
          </StyledText>
        ))}
      </StyledView>
    </StyledView>
  );
}
