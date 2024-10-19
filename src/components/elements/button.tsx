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
      className={` ${className} flex border-1 border-black rounded-md ${
        isDefault ? "bg-black" : "bg-white"
      } ${isSizeDefault ? " px-5 py-4" : "p-2"} ${fill && "flex-1"}`}
    >
      <StyledView className="gap-x-2 flex flex-row">
        {left?.(isSizeDefault ? 22 : 18)}
        {loading ? (
          <ActivityIndicator color={"black"} />
        ) : (
          <StyledText
            className={`${
              isDefault ? "text-white" : "text-black"
            } flex-1 text-center`}
          >
            {children}
          </StyledText>
        )}
        {right?.(isSizeDefault ? 22 : 18)}
      </StyledView>
    </BaseButton>
  );
}
