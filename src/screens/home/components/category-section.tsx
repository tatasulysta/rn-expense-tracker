import React from "react";
import { useNavigation } from "../../../hooks/use-navigation";
import DefaultScrollView from "../../../components/common/scroll-view";
import { StyledText, StyledView } from "../../../components/common";
import CategoryButton from "../../components/category";
import { BaseButton } from "../../../components/elements/button";
import {
  CATEGORY_SCREEN_CREATE_ROUTE,
  CATEGORY_SCREEN_ROUTE,
  CATEGORY_SCREEN_VIEW_ROUTE,
} from "../../../../router-type";
import { AddIcon, CaretRightIcon } from "../../../assets";
import SectionWrapper from "./section-wrapper";
import useGetCategoryList from "../../../hooks/use-get-category-list";

export default function CategorySection() {
  const { navigate } = useNavigation();
  const { categories } = useGetCategoryList();

  return (
    <SectionWrapper title="Category">
      <DefaultScrollView horizontal contentContainerStyle={{ gap: 12 }}>
        {categories.splice(0, 3).map((category) => (
          <CategoryButton
            key={`${category._id}`}
            color={category.color}
            icon={category.icon}
            label={category.label}
            onPress={() =>
              navigate(CATEGORY_SCREEN_VIEW_ROUTE, { id: category._id as any })
            }
          />
        ))}

        <BaseButton
          onPress={() => navigate(CATEGORY_SCREEN_CREATE_ROUTE)}
          className="max-w-50 w-fit flex items-center p-2 border-1 rounded-md"
        >
          <AddIcon size={32} />
          <StyledText
            className="max-w-fit text-center text-ellipsis text-nowrap"
            numberOfLines={2}
          >
            Add Category
          </StyledText>
        </BaseButton>
        <BaseButton
          onPress={() => navigate(CATEGORY_SCREEN_ROUTE)}
          className="max-w-50 w-fit flex items-center p-2 border-1 rounded-md"
        >
          <CaretRightIcon size={32} />
          <StyledText
            className="max-w-fit text-center text-ellipsis text-nowrap"
            numberOfLines={2}
          >
            View All
          </StyledText>
        </BaseButton>
      </DefaultScrollView>
    </SectionWrapper>
  );
}
