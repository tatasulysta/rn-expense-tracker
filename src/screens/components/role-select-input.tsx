import React from "react";
import Input from "../../components/elements/field";
import { UserIcon } from "../../assets";
import { UserTypeEnum } from "../../store/auth.schema";

interface Props {
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function RoleSelectInput(props: Props) {
  const { name, ...rest } = props;

  return (
    <Input
      name={name}
      type="select"
      options={Object.keys(UserTypeEnum).map((key) => ({
        label: key,
        //@ts-ignore
        value: UserTypeEnum[key] as string,
      }))}
      {...rest}
      leftSection={<UserIcon size={24} />}
    />
  );
}
