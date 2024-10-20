import React from "react";
import { StyledView } from "../../components/common";
import DefaultFlatList from "../../components/common/flat-list";
import Button from "../../components/elements/button";
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
import { useCredential } from "../../hooks/use-credential";
import { UserTypeEnum } from "../../store/auth.schema";
import UserSelectInput from "../components/user-state-select-input";

export default function CategoryScreen() {
  const { credential } = useCredential();

  const isAdmin = credential?.user?.type === UserTypeEnum.Admin;
  const uid = `${credential?.user?._id}`;

  const [userId, setUserId] = React.useState<string>(isAdmin ? "" : uid);
  const { categories } = useGetCategoryList({
    userId,
  });

  const { navigate } = useNavigation();

  return (
    <DefaultLayout header={<Header title={"Category"} />}>
      <DefaultScrollView>
        {isAdmin && (
          <UserSelectInput
            value={userId}
            onChange={(value) => setUserId(value)}
            excludeAdmin
          />
        )}
        <DefaultFlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{
            gap: 30,
            marginTop: isAdmin ? 30 : 0,
          }}
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
        <Button
          onPress={() =>
            navigate(
              CATEGORY_SCREEN_CREATE_ROUTE,
              isAdmin && userId ? { userId } : undefined,
            )
          }
          className="mt-5"
        >
          Add New Category
        </Button>
      </DefaultScrollView>
    </DefaultLayout>
  );
}
