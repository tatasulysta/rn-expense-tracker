import React from "react";
import {
  Text,
  TextInputProps as RawTextInputProps,
  View,
  TextInput as RawTextInput,
  TouchableOpacity,
} from "react-native";
import InputBaseWrapper, { InputBaseProps } from "./input-base-wrapper";
import { styled } from "nativewind";
import { StyledView } from "../common";
import { EyeCloseIcon, EyeIcon } from "../../assets";

export interface TextInputProps
  extends Omit<RawTextInputProps, "placeholder" | "secureTextEntry">,
    InputBaseProps {
  type: "password" | "text" | "number" | "email";
  placeholder: string;
  icon?: (size: number) => React.ReactNode;
}

const StyledRawTextInput = styled(RawTextInput);
export default function TextInput(props: TextInputProps) {
  const { type, icon, leftSection, rightSection, error, ...rest } = props;
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = React.useState(isPassword);

  const _rightSection = (
    <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
      {showPassword ? <EyeCloseIcon size={24} /> : <EyeIcon size={24} />}
    </TouchableOpacity>
  );

  const extraProps = React.useMemo<RawTextInputProps>(() => {
    let key = {};
    switch (props.type) {
      case "password":
        key = {
          multiline: false,
          inputMode: "text",
        };
        break;
      case "email":
        key = {
          inputMode: "email",
        };
        break;
      case "number":
        key = {
          inputMode: "numeric",
        };
        break;
    }
    return key;
  }, [props.type]);

  return (
    <InputBaseWrapper
      leftSection={
        <StyledView className="flex flex-row items-center">
          {icon?.(24)}
          {leftSection}
        </StyledView>
      }
      rightSection={
        <StyledView className="flex flex-row items-center">
          {isPassword && _rightSection}
          {rightSection}
        </StyledView>
      }
      error={error}
    >
      <StyledRawTextInput
        {...rest}
        {...extraProps}
        secureTextEntry={showPassword}
        className="text-base"
        keyboardAppearance="light"
      />
    </InputBaseWrapper>
  );
}
