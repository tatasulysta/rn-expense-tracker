import React from "react";
import { StyledText, StyledView } from "../../components/common";
import DefaultLayout from "../../components/layout/default-layout";

import DefaultScrollView from "../../components/common/scroll-view";
import { useRealm } from "../../hooks/use-realm";
import Button, { BaseButton } from "../../components/elements/button";
import { useNavigation } from "../../hooks/use-navigation";
import { AddIcon } from "../../assets";
import {
  MUTATION_CREATE_SCREEN_ROUTE,
  MUTATION_SCREEN_GROUP_ROUTE,
  MUTATION_VIEW_SCREEN_ROUTE,
} from "../../../router-type";
import { useCredential } from "../../hooks/use-credential";
import { StackNavigationScreenProps } from "../../../router";
import { Mutation, MutationType } from "../../store/auth.schema";
import { format } from "date-fns";
import Header from "../../components/widgets/header";
import { string2money } from "../../utils/string";

interface Props
  extends StackNavigationScreenProps<typeof MUTATION_SCREEN_GROUP_ROUTE> {}
export default function MutationScreen(props: Props) {
  const {
    route: {
      params: { endAt, startAt, userId },
    },
  } = props;
  const realm = useRealm();
  const { navigate } = useNavigation();
  const [mutation, setMutation] = React.useState<Mutation[]>([]);

  React.useEffect(() => {
    if (realm.mutation) {
      const mutationData = realm.mutation
        ?.objects("Mutation")
        .filtered(
          `userId == $0 && transactionAt >= $1 && transactionAt <= $2`,
          userId,
          startAt,
          endAt,
        );

      const _mutations = (mutationData || []) as unknown as Mutation[];
      setMutation([..._mutations]);

      const listener = () => setMutation([..._mutations]);

      mutationData.addListener(listener);
      return () => {
        mutationData.removeListener(listener);
      };
    }
  }, [realm.mutation, userId, startAt, endAt]);

  return (
    <DefaultLayout header={<Header title="Mutation"></Header>}>
      <DefaultScrollView className="gap-y-3">
        <DefaultScrollView contentContainerStyle={{ gap: 20 }}>
          {mutation.map((mutation, index) => (
            <MutationButton key={mutation._id.toString()} mutation={mutation} />
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
      </DefaultScrollView>
    </DefaultLayout>
  );
}

function MutationButton(props: { mutation: Mutation }) {
  const { mutation } = props;

  const { navigate } = useNavigation();

  return (
    <BaseButton
      className={`rounded-xl p-4  flex-grow-0  ${
        mutation.type == MutationType.Expense ? "bg-green-100" : "bg-blue-100"
      } `}
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
  );
}
