import React from "react";
import { useRealm } from "../../../hooks/use-realm";
import { useNavigation } from "../../../hooks/use-navigation";
import { useCredential } from "../../../hooks/use-credential";
import { Category } from "../../../store/auth.schema";
import DefaultScrollView from "../../../components/common/scroll-view";
import { StyledText, StyledView } from "../../../components/common";
import CategoryButton from "../../components/category";
import { BaseButton } from "../../../components/elements/button";
import { CATEGORY_SCREEN_CREATE_ROUTE } from "../../../../router-type";
import { AddIcon } from "../../../assets";
import SectionWrapper from "./section-wrapper";

export default function CategorySection() {
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
    <SectionWrapper title="Category">
      <DefaultScrollView horizontal contentContainerStyle={{ gap: 12 }}>
        {categories.map((category) => (
          <CategoryButton
            key={`${category._id}`}
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
    </SectionWrapper>
  );
}
