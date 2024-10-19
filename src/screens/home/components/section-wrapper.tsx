import React from "react";
import { StyledText, StyledView } from "../../../components/common";

interface Props extends React.PropsWithChildren {
  title: string;
}
export default function SectionWrapper(props: Props) {
  return (
    <StyledView className="py-2 px-3 shadow-sm flex flex-col rounded-md bg-white">
      <StyledView className="flex flex-row items-center gap-2 mb-2">
        <StyledText className="text-black font-medium text-base text-left">
          {props.title}
        </StyledText>
        <StyledView className="border-t-1 border-solid border-pink-300 flex-1" />
      </StyledView>
      {props.children}
    </StyledView>
  );
}
