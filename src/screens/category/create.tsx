import React from "react";
import CategoryForm from "./form";
import { CATEGORY_SCREEN_CREATE_ROUTE } from "../../../router-type";
import { StackNavigationScreenProps } from "../../../router";

interface Props
  extends StackNavigationScreenProps<typeof CATEGORY_SCREEN_CREATE_ROUTE> {}
export default function CategoryCreate(props: Props) {
  return <CategoryForm userId={props.route.params?.userId} />;
}
