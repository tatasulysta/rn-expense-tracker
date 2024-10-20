import React from "react";
import SectionWrapper from "../section-wrapper";
import GraphMonth from "./pie-chart";
import SpendingChart from "./spending-chart";

export default function GraphSection() {
  return (
    <>
      <SectionWrapper title="Expense Analytics">
        <SpendingChart />
      </SectionWrapper>
      <SectionWrapper title="Category Analytics">
        <GraphMonth />
      </SectionWrapper>
    </>
  );
}
