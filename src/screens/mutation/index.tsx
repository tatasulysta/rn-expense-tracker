import React from "react";
import { StyledText } from "../../components/common";
import DefaultLayout from "../../components/layout/default-layout";

import DefaultScrollView from "../../components/common/scroll-view";
import { useRealm } from "../../hooks/use-realm";
import Button, { BaseButton } from "../../components/elements/button";
import { useNavigation } from "../../hooks/use-navigation";
import { AddIcon } from "../../assets";
import { CATEGORY_SCREEN_CREATE_ROUTE } from "../../../router-type";
import { useCredential } from "../../hooks/use-credential";
import { Category } from "../../store/auth.schema";
import { CategoryIcon } from "../category/helper";

export default function MutationScreen() {
  const realm = useRealm();
  const { navigate } = useNavigation();
  const { credential } = useCredential();
  const [category, setCategory] = React.useState<string>("");

  const categories = React.useMemo<Category[]>(() => {
    return (
      (realm.category
        ?.objects("Category")
        .filtered(
          `userId == $0`,
          `${credential?.user?._id}`,
        ) as unknown as Category[]) || []
    );
  }, [realm.category]);

  return (
    <DefaultLayout>
      <DefaultScrollView className="gap-y-3">
        <StyledText className="text-black font-medium text-base text-center">
          Spend by Category
        </StyledText>
        <DefaultScrollView
          horizontal
          className="gap-4 flex-grow-0 p-4 bg-white"
        >
          {categories.map((category, index) => (
            <BaseButton
              key={index}
              className={[
                category.color,
                "p-2 flex-grow-0 self-start max-w-60 items-center rounded-lg",
              ].join(" ")}
            >
              {CategoryIcon[category.icon]({ size: 50 })}
              <StyledText
                className="max-w-fit text-center text-ellipsis text-nowrap"
                numberOfLines={2}
              >
                {category.label}
              </StyledText>
            </BaseButton>
          ))}

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
      </DefaultScrollView>
    </DefaultLayout>
  );
}
