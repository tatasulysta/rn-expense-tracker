import React from "react";
import { StyledText, StyledView } from "../../components/common";
import DefaultLayout from "../../components/layout/default-layout";

import DefaultScrollView from "../../components/common/scroll-view";
import { useRealm } from "../../hooks/use-realm";
import Button, { BaseButton } from "../../components/elements/button";
import { useNavigation } from "../../hooks/use-navigation";
import { AddIcon, TrashIcon } from "../../assets";
import {
  HOME_SCREEN_ROUTE,
  MUTATION_CREATE_SCREEN_ROUTE,
  MUTATION_SCREEN_GROUP_ROUTE,
  MUTATION_VIEW_SCREEN_ROUTE,
} from "../../../router-type";
import { useCredential } from "../../hooks/use-credential";
import { StackNavigationScreenProps } from "../../../router";
import { Mutation, MutationType, Wallet } from "../../store/auth.schema";
import { format, startOfMonth } from "date-fns";
import Header from "../../components/widgets/header";
import { string2money } from "../../utils/string";
import { resetTime } from "../../utils/date";
import { toast } from "../../utils/notification";

interface Props
  extends StackNavigationScreenProps<typeof MUTATION_SCREEN_GROUP_ROUTE> {}
export default function MutationScreen(props: Props) {
  const {
    route: {
      params: { endAt, startAt, userId },
    },
  } = props;
  const realm = useRealm();
  const { navigate, reset } = useNavigation();
  const [mutation, setMutation] = React.useState<Mutation[]>(
    realm.mutation
      ?.objects("Mutation")
      .filtered(
        `userId == $0 && transactionAt >= $1 && transactionAt <= $2`,
        userId,
        startAt,
        endAt,
      ) as any as Mutation[],
  );

  const onDelete = (mutation: Mutation) => {
    try {
      realm.wallet?.write(() => {
        const walletToEdit = realm.wallet
          ?.objects("Wallet")
          .filtered(
            "userId==$0 && date==$1",
            mutation.userId,
            startOfMonth(resetTime(mutation.transactionAt)),
          )[0] as unknown as Wallet;
        const before = {
          income:
            (mutation?.type === MutationType.Income ? mutation?.amount : 0) ||
            0,
          expense:
            (mutation?.type === MutationType.Expense ? mutation?.amount : 0) ||
            0,
        };
        const isIncome = mutation.type === MutationType.Income;

        if (isIncome) {
          walletToEdit.income = (walletToEdit.income || 0) - before.income;
          walletToEdit.expense = (walletToEdit.expense || 0) - before.expense;
        } else {
          walletToEdit.income = (walletToEdit.income || 0) - before.income;
          walletToEdit.expense = walletToEdit.expense || 0;
        }
      });
      realm.mutation?.write(() => realm.mutation?.delete(mutation));

      // TO MANIPULATE REALM CACHE AFTER DELETE THE MUATITON
      reset({
        index: 0,
        routes: [{ name: HOME_SCREEN_ROUTE }],
      });
      setMutation((prev) =>
        prev.filter((mut) => mut._id.toString() !== mutation._id.toString()),
      );
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <DefaultLayout header={<Header title="Mutation"></Header>}>
      <DefaultScrollView contentContainerStyle={{ gap: 20 }}>
        {mutation.map((mutation, index) => (
          <MutationButton
            key={mutation._id.toString()}
            mutation={mutation}
            onDelete={() => onDelete(mutation)}
          />
        ))}

        <Button onPress={() => navigate(MUTATION_CREATE_SCREEN_ROUTE)}>
          <StyledText
            className="max-w-fit text-center text-ellipsis text-nowrap"
            numberOfLines={2}
          >
            Add New Mutation
          </StyledText>
        </Button>
      </DefaultScrollView>
    </DefaultLayout>
  );
}

function MutationButton(props: { mutation: Mutation; onDelete: () => void }) {
  const { mutation } = props;

  const { navigate } = useNavigation();

  return (
    <StyledView
      className={`rounded-xl p-4  flex-1 gap-2 flex-row justify-between items-center  ${
        mutation.type == MutationType.Expense ? "bg-pink-50" : "bg-blue-50"
      } `}
    >
      <BaseButton
        onPress={() =>
          navigate(MUTATION_VIEW_SCREEN_ROUTE, {
            id: mutation._id as any,
          })
        }
      >
        <StyledText className="text-neutral-700">
          {`Type: ${mutation.type}`}
        </StyledText>
        <StyledText className="text-neutral-700">
          {`Transaction At: ${format(mutation.transactionAt, "dd/MM/yyyy")}`}
        </StyledText>
        <StyledText className="text-neutral-700">
          {`Category: ${mutation.categoryName || "-"}`}
        </StyledText>
        <StyledText className="text-neutral-700 font-semibold">
          {`Amount: ${string2money(mutation.amount) || "-"}`}
        </StyledText>
        <StyledText className="text-neutral-700">
          {`Note: ${mutation.description || "-"}`}
        </StyledText>
        <StyledView className="flex-row flex-1 justify-between"></StyledView>
      </BaseButton>
      <BaseButton onPress={() => props.onDelete()}>
        <TrashIcon size={40} />
      </BaseButton>
    </StyledView>
  );
}
