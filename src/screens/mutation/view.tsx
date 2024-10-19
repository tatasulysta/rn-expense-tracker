import React from "react";
import { StackNavigationScreenProps } from "../../../router";
import MutationForm from "./components/form";
import { MUTATION_VIEW_SCREEN_ROUTE } from "../../../router-type";

interface Props
  extends StackNavigationScreenProps<typeof MUTATION_VIEW_SCREEN_ROUTE> {}
export default function MutationView(props: Props) {
  return <MutationForm id={props.route.params.id} />;
}
