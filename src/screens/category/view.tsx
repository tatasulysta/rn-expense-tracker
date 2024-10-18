import React from "react";
import { CATEGORY_SCREEN_VIEW_ROUTE } from "../../../router-type";
import { StackNavigationScreenProps } from "../../../router";
import CategoryForm from "./form";
import { useRealm } from "../../hooks/use-realm";

interface Props
  extends StackNavigationScreenProps<typeof CATEGORY_SCREEN_VIEW_ROUTE> {}
export default function CategoryView(props: Props) {
  const realm = useRealm();
  return (
    <CategoryForm
      category={realm.category.objectForPrimaryKey(
        "Category",
        props.route.params.id,
      )}
    />
  );
}
