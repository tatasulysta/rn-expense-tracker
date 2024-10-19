import React from "react";
import { CATEGORY_SCREEN_VIEW_ROUTE } from "../../../router-type";
import { StackNavigationScreenProps } from "../../../router";
import CategoryForm from "./form";

interface Props
  extends StackNavigationScreenProps<typeof CATEGORY_SCREEN_VIEW_ROUTE> {}
export default function CategoryView(props: Props) {
  return <CategoryForm id={props.route.params.id} />;
}
