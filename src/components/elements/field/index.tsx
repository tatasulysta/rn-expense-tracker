import React from "react";
import SelectInputField, { SelectInputFieldProps } from "./select-input-field";
import TextInputField, { TextInputFieldProps } from "./text-input-field";

export default function Input(
  props: SelectInputFieldProps | TextInputFieldProps,
) {
  switch (props.type) {
    case "select":
      return <SelectInputField {...props} />;
    default:
      return <TextInputField {...props} />;
  }
}
