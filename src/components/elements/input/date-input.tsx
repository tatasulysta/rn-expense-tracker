import { format } from "date-fns";
import React, { useState } from "react";
import DatePicker, { DatePickerProps } from "react-native-date-picker";
import Button, { BaseButton } from "../button";
import InputBaseWrapper from "./input-base-wrapper";
import { StyledText } from "../../common";

export interface DateInputProps
  extends Omit<DatePickerProps, "date" | "onDateChange"> {
  value: Date | null;
  placeholder?: string;
  onChange: (value: Date) => void;
  error?: string;
  label?: string;
}
export default function DateInput(props: DateInputProps) {
  const {
    value,
    placeholder = "Choose Date",
    onChange,
    error,
    label,
    ...restProps
  } = props;
  const [date, setDate] = React.useState<Date | null>(value);
  const [open, setOpen] = useState(false);

  return (
    <InputBaseWrapper label={label}>
      <BaseButton
        onPress={() => setOpen(true)}
        className={`py-1 ${error ? "border-red-500" : "border-white"}`}
      >
        <StyledText>
          {date ? format(date, "dd/MM/yyyy") : placeholder}
        </StyledText>
      </BaseButton>
      <DatePicker
        {...restProps}
        modal
        mode="date"
        open={open}
        date={date || new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          onChange(date);
        }}
        onCancel={() => setOpen(false)}
      />
    </InputBaseWrapper>
  );
}
