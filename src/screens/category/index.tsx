import React from "react";
import { StyledText, StyledView } from "../../components/common";
import DefaultFlatList from "../../components/common/flat-list";
import { CategoryColor, CategoryIcon } from "./helper";
// import { useCredential } from "../../hooks/use-credential";
import Button, { BaseButton } from "../../components/elements/button";
import TextInput from "../../components/elements/input/text-input";
import DefaultLayout from "../../components/layout/default-layout";
import Header from "../../components/widgets/header";
import DefaultScrollView from "../../components/common/scroll-view";
import useGetCategoryList from "../../hooks/use-get-category-list";
import CategoryButton from "../components/category";
import { useNavigation } from "../../hooks/use-navigation";
import {
  CATEGORY_SCREEN_CREATE_ROUTE,
  CATEGORY_SCREEN_VIEW_ROUTE,
} from "../../../router-type";

export default function CategoryScreen() {
  const { categories } = useGetCategoryList();
  const { navigate } = useNavigation();

  return (
    <DefaultLayout header={<Header title={"Category"} />}>
      <DefaultScrollView>
        <DefaultFlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{ gap: 30, marginBottom: 30 }}
          data={categories}
          numColumns={6}
          renderItem={({ item: category }) => (
            <CategoryButton
              key={`${category._id}`}
              color={category.color}
              icon={category.icon}
              label={category.label}
              onPress={() =>
                navigate(CATEGORY_SCREEN_VIEW_ROUTE, {
                  id: category._id as any,
                })
              }
            />
          )}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <StyledView className="w-full h-2" />}
        ></DefaultFlatList>
        <Button onPress={() => navigate(CATEGORY_SCREEN_CREATE_ROUTE)}>
          Add New Category
        </Button>
      </DefaultScrollView>
    </DefaultLayout>
  );
}
