import React from "react";
import { useRealm } from "../../hooks/use-realm";
import { User } from "../../store/auth.schema";
import Input from "../../components/elements/field";
import { UserIcon } from "../../assets";

interface Props {
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function UserSelectInput(props: Props) {
  const realm = useRealm();
  const { name, ...rest } = props;
  const users = (realm.user?.objects("User") as unknown as User[]) || [];

  return (
    <Input
      name={name}
      type="select"
      placeholder={"Select User"}
      options={users.map((user) => ({
        label: user.email,
        value: `${user._id}`,
      }))}
      {...rest}
      leftSection={<UserIcon size={24} />}
    />
  );
}
