import React from "react";
import TextInput, { TextInputProps } from "../input/text-input";
import { useController } from "react-hook-form";

export interface TextInputFieldProps extends TextInputProps {
  name: string;
}
export default function TextInputField(props: TextInputFieldProps) {
  const { name, editable: _editable, readOnly, error, ...rest } = props;

  const {
    field: { onChange, ...restField },
    fieldState,
  } = useController({ name });

  return (
    <TextInput
      {...rest}
      {...restField}
      onChangeText={(value) => onChange(value)}
      error={error || (fieldState.error && fieldState.error?.message) || ""}
    />
  );
}
