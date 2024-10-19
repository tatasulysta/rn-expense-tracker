import React from "react";
import { StyledText, StyledView } from "../../common";

export interface InputBaseProps extends React.PropsWithChildren {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  error?: string;
  label?: string;
}

export default function InputBaseWrapper(props: InputBaseProps) {
  const { children, error, leftSection, rightSection, label } = props;
  return (
    <StyledView
      className={`flex flex-col gap-y-0 bg-white rounded-md shadow-sm mx-2 py-2 px-3 ${
        !!error && "border-red-300 border-solid border-2"
      }`}
    >
      {!!label && (
        <StyledText className="text-base text-neutral-600 text-left">
          {label}
        </StyledText>
      )}
      <StyledView className={`w-fit flex flex-row gap-2 items-center`}>
        {leftSection}
        <StyledView className="mt-1 flex-1">{children}</StyledView>
        {rightSection}
      </StyledView>
    </StyledView>
  );
}
