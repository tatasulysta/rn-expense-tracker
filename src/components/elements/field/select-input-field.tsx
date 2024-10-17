import React from "react";

import { useController } from "react-hook-form";
import SelectInput, { SelectInputProps } from "../input/select-input";

export interface SelectInputFieldProps extends SelectInputProps {
  name: string;
  type: "select";
}

export default function SelectInputField(props: SelectInputFieldProps) {
  const { name, error, ...rest } = props;

  const {
    field: { onChange, ...restField },
    fieldState,
  } = useController({ name });

  return (
    <SelectInput
      {...rest}
      {...restField}
      onChange={(value) => onChange(value)}
      error={error || (fieldState.error && fieldState.error?.message) || ""}
    />
  );
}
