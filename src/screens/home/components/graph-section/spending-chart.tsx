import React from "react";
import { useRealm } from "../../../../hooks/use-realm";
import { useCredential } from "../../../../hooks/use-credential";
import useMonthSelect from "../../utils/use-month-select";
import { resetTime } from "../../../../utils/date";
import { endOfMonth } from "date-fns";
import { Mutation, UserTypeEnum } from "../../../../store/auth.schema";
import { useBreakdownMutationByDate } from "../../utils/use-breakdown-mutation";
import useYearSelect from "../../utils/use-year-select";
import { StyledText, StyledView } from "../../../../components/common";
import Badge from "./badge";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { GRAPH_CONFIG } from "../../utils/graph-color";
import DefaultScrollView from "../../../../components/common/scroll-view";
import UserSelectInput from "../../../components/user-state-select-input";

export default function SpendingChart() {
  const realm = useRealm();

  const { credential } = useCredential();
  const uid = `${credential?.user?._id}`;
  const isAdmin = credential?.user?.type === UserTypeEnum.Admin;

  const [mutations, setMutations] = React.useState<Mutation[]>([]);
  const [type, setType] = React.useState<"monthly" | "weekly">("monthly");
  const [userId, setUserId] = React.useState<string>(isAdmin ? "" : uid);

  const { Component, value: startOfMonth } = useMonthSelect({ userId });
  const { Component: YearComponent, value: year } = useYearSelect({ userId });

  React.useEffect(() => {
    if (realm.mutation) {
      // if (type === "weekly") {
      const _startOfMonth = resetTime(new Date(startOfMonth));

      const eom = resetTime(endOfMonth(_startOfMonth));
      const mutationData = realm.mutation
        ?.objects("Mutation")
        .filtered(
          "userId == $0 && transactionAt >= $1 && transactionAt <= $2",
          userId,
          _startOfMonth,
          eom,
        );

      // } else {
      //   console.log("re-trigger", userId);

      //   const foy = new Date(year);
      //   const eoy = resetTime(endOfYear(foy));
      //   mutationData.filtered(
      //     `userId == $0 && transactionAt >= $1 && transactionAt <= $2`,
      //     userId,
      //     foy,
      //     eoy,
      //   );
      // }

      const _wallets = (mutationData || []) as unknown as Mutation[];
      setMutations([..._wallets]);

      const listener = () => setMutations([..._wallets]);

      mutationData.addListener(listener);
      return () => mutationData.removeListener(listener);
    }
  }, [realm.wallet, startOfMonth, type, year, userId]);
  const { mutationGroup } = useBreakdownMutationByDate({
    year: new Date(year).getFullYear(),
    mutations,
    weekly: new Date(startOfMonth),
  });

  return (
    <StyledView className="mt-3">
      <StyledView className="gap-y-3 flex flex-col">
        {isAdmin && (
          <UserSelectInput
            excludeAdmin
            onChange={(value) => {
              setUserId(value);
            }}
            value={userId}
          />
        )}
        <StyledView>{type === "weekly" ? Component : YearComponent}</StyledView>

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
