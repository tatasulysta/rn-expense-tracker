import React from "react";
import { StyledText, StyledView } from "../common";
import { InfoIcon } from "../../assets";

export default function TextInfo(props: React.PropsWithChildren) {
  return (
    <StyledView className="flex flex-1 items-center flex-row gap-2 mt-1">
      <InfoIcon size={16} />
      <StyledText className="text-sm text-neutral-500">
        {props.children}
      </StyledText>
    </StyledView>
  );
}
