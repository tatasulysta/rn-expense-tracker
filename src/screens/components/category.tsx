import React from "react";
import { BaseButton } from "../../components/elements/button";
import { CategoryIcon } from "../category/helper";
import { StyledText } from "../../components/common";

interface Props {
  icon: string;
  color: string;
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

export default function CategoryButton(props: Props) {
  return (
    <BaseButton
      className={`${
        props.color
      } p-2 flex-grow-0  max-w-60 items-center rounded-lg ${
        props.isActive && "border-1 border-black border-solid"
      }`}
      onPress={props.onPress}
    >
      {CategoryIcon[props.icon]({ size: 50 })}
      <StyledText
        className="max-w-fit text-center text-ellipsis text-nowrap"
        numberOfLines={2}
      >
        {props.label}
      </StyledText>
    </BaseButton>
  );
}
