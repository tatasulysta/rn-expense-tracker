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
  left?: (color: string, size: number) => React.ReactNode;
  right?: (color: string, size: number) => React.ReactNode;
  upperText?: boolean;
}

type ExtraClassType = {
  text: string[];
  container: string[];
};

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
    ...rest
  } = props;

  const extraClassName = React.useMemo<ExtraClassType>(() => {
    const temp: ExtraClassType = { text: [], container: [] };
    switch (variant) {
      case "default":
        temp.text.push("text-white"), temp.container.push("bg-black");
        break;
      case "outlined":
        temp.text.push("text-black");
        temp.container.push("bg-white");
        break;
    }

    switch (size) {
      case "default":
        temp.container.push("px-5 py-4");
        break;
      default:
        temp.container.push("p-2");
    }
    return temp;
  }, [size, variant]);

  return (
    <BaseButton
      {...rest}
      disabled={disabled || loading}
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}
      className={[
        "flex flex-row justify-center border-2 border-black rounded-md",
        ...extraClassName.container,
        fill && "flex-1",
      ].join(" ")}
    >
      <>
        {loading ? (
          <ActivityIndicator color={"black"} />
        ) : (
          <StyledText className={extraClassName.text.join(" ")}>
            {children}
          </StyledText>
        )}
      </>
    </BaseButton>
  );
}
