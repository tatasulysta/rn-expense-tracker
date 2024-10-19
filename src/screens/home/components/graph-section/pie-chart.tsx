import React from "react";
import { useCredential } from "../../../../hooks/use-credential";
import { useRealm } from "../../../../hooks/use-realm";
import { Mutation, MutationType } from "../../../../store/auth.schema";
import { resetTime } from "../../../../utils/date";
import { endOfMonth } from "date-fns";
import { StyledText, StyledView } from "../../../../components/common";
import { PieChart } from "react-native-chart-kit";
import { getGraphColor, GRAPH_CONFIG } from "../../utils/graph-color";
import { Dimensions } from "react-native";
import useMonthSelect from "../../utils/use-month-select";
import Badge from "./badge";
import useBreakdownMutation from "../../utils/use-breakdown-mutation";

export default function GraphMonth() {
  const realm = useRealm();
  const { credential } = useCredential();
  const { Component, value: startOfMonth } = useMonthSelect();
  const [type, setType] = React.useState<"income" | "expense">("expense");

  const uid = `${credential?.user?._id}`;

  const [mutations, setMutations] = React.useState<Mutation[]>([]);
  const mutationGroup = useBreakdownMutation({ mutations });

  React.useEffect(() => {
    if (realm.mutation) {
      const _startOfMonth = resetTime(new Date(startOfMonth));

      const eom = resetTime(endOfMonth(_startOfMonth));

      const mutationData = realm.mutation
        ?.objects("Mutation")
        .filtered(
          `userId == $0 && transactionAt >= $1 && transactionAt <= $2`,
          uid,
          _startOfMonth,
          eom,
        );

      const _wallets = (mutationData || []) as unknown as Mutation[];
      setMutations([..._wallets]);

      const listener = () => setMutations([..._wallets]);

      mutationData.addListener(listener);
      return () => mutationData.removeListener(listener);
    }
  }, [realm.wallet, startOfMonth]);

  const datas = Object.keys(mutationGroup[type].datas);
  return (
    <StyledView className="gap-y-3">
      <StyledView>
        <StyledView className="flex flex-row gap-x-1 mb-2 " style={{ gap: 8 }}>
          <Badge
            value="expense"
            state={type}
            onPress={() => setType("expense")}
          >
            Expense
          </Badge>
          <Badge value="income" state={type} onPress={() => setType("income")}>
            Income
          </Badge>
        </StyledView>
      </StyledView>
      {Component}
      <StyledView className="flex flex-1">
        {!datas.length && (
          <StyledText className="text-base"> No Data</StyledText>
        )}
        <PieChart
          data={datas.map((key, index) => {
            const mutations = mutationGroup[type].datas[key].reduce(
              (prev, curr) => prev + curr.amount,
              0,
            );
            return {
              name: key.split("|")[0],
              percentage: Number(
                ((mutations / mutationGroup[type].total) * 100).toFixed(2),
              ),
              color: getGraphColor(index),
            };
          })}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={GRAPH_CONFIG}
          accessor="percentage"
          backgroundColor={"transparent"}
          paddingLeft="20"
          absolute
        />
      </StyledView>
    </StyledView>
  );
}
