import React from "react";

import { useController } from "react-hook-form";
import DateInput, { DateInputProps } from "../input/date-input";

export interface DateInputFieldProps
  extends Omit<DateInputProps, "value" | "onChange"> {
  name: string;
  type: "date";
}

export default function DateInputField(props: DateInputFieldProps) {
  const { name, error, ...rest } = props;

  const {
    field: { onChange, ...restField },
    fieldState,
  } = useController({ name });

  return (
    <DateInput
      {...rest}
      {...restField}
      onChange={(value) => onChange(value)}
      error={error || (fieldState.error && fieldState.error?.message) || ""}
    />
  );
}
