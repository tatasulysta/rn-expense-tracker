import React from "react";
import { StyledText, StyledView } from "../common";

export interface InputBaseProps extends React.PropsWithChildren {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  error?: string;
}

export default function InputBaseWrapper(props: InputBaseProps) {
  const { children, error, leftSection, rightSection } = props;
  return (
    <StyledView
      className={`py-2 px-3 w-fit flex flex-row gap-2 items-center bg-white rounded-md ${
        !!error && "border-red-300 border-solid border-2"
      }`}
    >
      {leftSection}
      <StyledView className="mt-1 flex-1">{children}</StyledView>
      {rightSection}
    </StyledView>
  );
}
