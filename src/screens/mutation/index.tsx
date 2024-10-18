import React from "react";
import { StyledText } from "../../components/common";
import DefaultLayout from "../../components/layout/default-layout";

import DefaultScrollView from "../../components/common/scroll-view";
import { useRealm } from "../../hooks/use-realm";
import Button, { BaseButton } from "../../components/elements/button";
import { useNavigation } from "../../hooks/use-navigation";
import { AddIcon } from "../../assets";
import { CATEGORY_SCREEN_CREATE_ROUTE } from "../../../router-type";

const uid = "38982902";
export default function MutationScreen() {
  const realm = useRealm();
  const { navigate } = useNavigation();
  console.log(realm.category?.objects("Category"));
  console.log(realm.category);
  // const categories = useQuery(Category);

  return (
    <DefaultLayout>
      <StyledText>Category</StyledText>
      <DefaultScrollView>
        <BaseButton
          onPress={() => navigate(CATEGORY_SCREEN_CREATE_ROUTE)}
          className="max-w-50 w-fit flex items-center p-2"
        >
          <AddIcon size={32} />
          <StyledText
            className="max-w-fit text-center text-ellipsis text-nowrap"
            numberOfLines={2}
          >
            Add Category
          </StyledText>
        </BaseButton>
      </DefaultScrollView>
    </DefaultLayout>
  );
}
