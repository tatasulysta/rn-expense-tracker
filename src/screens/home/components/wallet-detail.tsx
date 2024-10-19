import React from "react";
import { Wallet } from "../../../store/auth.schema";
import { BaseButton } from "../../../components/elements/button";
import { StyledText, StyledView } from "../../../components/common";
import { useCredential } from "../../../hooks/use-credential";
import { endOfMonth, format } from "date-fns";
import { string2money } from "../../../utils/string";
import { useNavigation } from "../../../hooks/use-navigation";
import { MUTATION_SCREEN_GROUP_ROUTE } from "../../../../router-type";

interface Props {
  wallet: Wallet;
}

function WalletText({
  amount,
  currency,
  label,
}: {
  amount: number;
  currency: string;
  label: string;
}) {
  return (
    <StyledView>
      <StyledText
        className={[
          "text-base font-medium",
          amount < 0 ? "text-red-500" : "text-green-500",
        ].join(" ")}
      >{`${currency} ${string2money(amount)}`}</StyledText>
      <StyledText className="text-sm text-neutral-700">{label}</StyledText>
    </StyledView>
  );
}
export default function WalletDetail(props: Props) {
  const { wallet } = props;
  const { credential } = useCredential();
  const currency = credential?.user?.defaultBaseRate!;
  const expense = wallet?.expense || 0;
  const income = wallet?.income || 0;
  const startMonth = wallet?.date;
  const endMonth = endOfMonth(startMonth);
  const { navigate } = useNavigation();

  return (
    <BaseButton
      className="rounded-xl p-4 gap-y-2 flex-grow-0 bg-fuchsia-100 "
      onPress={() =>
        navigate(MUTATION_SCREEN_GROUP_ROUTE, {
          endAt: endMonth,
          startAt: startMonth,
          userId: credential?.user?._id.toString()!,
        })
      }
    >
      <StyledText className="text-neutral-700">{`${format(
        startMonth,
        "dd/MM/yyyy",
      )} - ${format(endMonth, "dd/MM/yyyy")}`}</StyledText>
      <StyledView className="flex-row flex-1 justify-between">
        <WalletText
          amount={income - expense}
          currency={currency}
          label="Total"
        />
        <WalletText amount={income} currency={currency} label="Income" />

        <WalletText amount={expense} currency={currency} label="Expense" />
      </StyledView>
    </BaseButton>
  );
}
