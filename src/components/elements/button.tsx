import { styled } from "nativewind";
import React from "react";
import {
  ActivityIndicator,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
} from "react-native";
import { StyledText, StyledView } from "../common";

export interface ButtonProps extends TouchableNativeFeedbackProps {
  children: React.ReactNode;
  className?: string;

  disabled?: boolean;
  loading?: boolean;
  variant?: "default" | "outlined";
  loadingColor?: string;
  onPress: () => void;
  size?: "default" | "small";
  fill?: boolean;
  left?: (size: number) => React.ReactNode;
  right?: (size: number) => React.ReactNode;
  upperText?: boolean;
}

export const BaseButton = styled(TouchableOpacity);
export default function Button(props: ButtonProps) {
  const {
    disabled,
    loading,
    onPress,
    fill,
    children,
    variant = "default",
    size = "default",
    className,
    left,
    right,

    ...rest
  } = props;

  const isDefault = variant === "default";
  const isSizeDefault = size === "default";

  return (
    <BaseButton
      {...rest}
      disabled={disabled || loading}
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}
      className={`${className} flex flex-row justify-center border-2 border-black rounded-md gap-y-2 ${
        isDefault ? "bg-black" : "bg-white"
      } ${isSizeDefault ? "px-5 py-4" : "p-2"} ${fill && "flex-1"}`}
    >
      <>
        {left?.(isSizeDefault ? 22 : 18)}
        {loading ? (
          <ActivityIndicator color={"black"} />
        ) : (
          <StyledText className={isDefault ? "text-white" : "text-black"}>
            {children}
          </StyledText>
        )}
        {right?.(isSizeDefault ? 22 : 18)}
      </>
    </BaseButton>
  );
}
