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
import CategoryButton from "../components/category";

export default function MutationScreen() {
  const realm = useRealm();
  const { navigate } = useNavigation();
  const { credential } = useCredential();
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    if (realm.category) {
      const categoryData = realm.category
        ?.objects("Category")
        .filtered(`userId == $0`, `${credential?.user?._id}`);

      const _categories = (categoryData || []) as unknown as Category[];
      setCategories([..._categories]);

      const listener = () => setCategories([..._categories]);

      categoryData.addListener(listener);
      return () => {
        categoryData.removeListener(listener);
      };
    }
  }, [realm.category]);

  return (
    <DefaultLayout>
      <DefaultScrollView className="gap-y-3">
        <StyledText className="text-black font-medium text-base text-center">
          Spend by Category
        </StyledText>
        <DefaultScrollView horizontal className="gap-4 flex-grow-0 p-4">
          {categories.map((category, index) => (
            <CategoryButton
              key={index}
              color={category.color}
              icon={category.icon}
              label={category.label}
            />
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
