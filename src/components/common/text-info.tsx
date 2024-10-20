import React from "react";
import { StyledText, StyledView } from "../common";
import { InfoIcon } from "../../assets";
import { tw } from "nativewind";

interface Props extends React.PropsWithChildren {
  withIndent?: boolean;
}
export default function TextInfo(props: Props) {
  return (
    <StyledView
      className={`flex flex-1 items-center flex-row gap-2 mt-1 ${
        props.withIndent && "mx-2"
      }`}
      style={{
        ...useTailwind,
      }}
    >
      <InfoIcon size={16} />
      <StyledText className="text-sm text-neutral-500">
        {props.children}
      </StyledText>
    </StyledView>
  );
}
