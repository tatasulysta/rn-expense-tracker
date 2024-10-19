import React from "react";
import SelectInputField, { SelectInputFieldProps } from "./select-input-field";
import TextInputField, { TextInputFieldProps } from "./text-input-field";
import DateInputField, { DateInputFieldProps } from "./date-input-field";

export default function Input(
  props: SelectInputFieldProps | TextInputFieldProps | DateInputFieldProps,
) {
  switch (props.type) {
    case "date":
      return <DateInputField {...props} />;
    case "select":
      return <SelectInputField {...props} />;
    default:
      return <TextInputField {...props} />;
  }
}
