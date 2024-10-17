import * as React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

import Button, { ButtonProps } from "./button";
import { isEmpty } from "../../utils/object";

interface Props extends Omit<ButtonProps, "onPress"> {
  onSubmit: SubmitHandler<any>;
}

export default function SubmitButton(props: Props) {
  const { onSubmit, disabled: _disabled, fill = true, ...rest } = props;
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext<any>();
  const isValid = isEmpty(errors);
  const disabled = !isValid || isSubmitting || _disabled;

  return (
    <Button
      {...rest}
      onPress={handleSubmit(onSubmit)}
      disabled={disabled}
      loading={isSubmitting}
      fill={fill}
    />
  );
}
