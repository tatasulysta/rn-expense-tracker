import React from "react";
import DefaultLayout from "../../components/layout/default-layout";
import DefaultScrollView from "../../components/common/scroll-view";

import { BaseButton } from "../../components/elements/button";
import { PencilIcon } from "../../assets";
import { useNavigation } from "../../hooks/use-navigation";
import { MUTATION_CREATE_SCREEN_ROUTE } from "../../../router-type";

import CategorySection from "./components/category-section";
import MutationSection from "./components/mutation-section";
import GraphSection from "./components/graph-section";

function FAB() {
  const { navigate } = useNavigation();

  return (
    <BaseButton
      onPress={() => navigate(MUTATION_CREATE_SCREEN_ROUTE)}
      style={{
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        position: "absolute",
        bottom: 10,
        height: 70,
        backgroundColor: "black",
        borderRadius: 100,
        right: 10,
      }}
    >
      <PencilIcon size={40} color="white" />
    </BaseButton>
  );
}
export default function Home() {
  return (
    <DefaultLayout className="relative ">
      <DefaultScrollView contentContainerStyle={{ gap: 20 }}>
        <GraphSection />
        <CategorySection />
        <MutationSection />
      </DefaultScrollView>
      <FAB />
    </DefaultLayout>
  );
}
