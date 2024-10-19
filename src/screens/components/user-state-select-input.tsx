import React from "react";
import { useRealm } from "../../hooks/use-realm";
import { User } from "../../store/auth.schema";
import { UserIcon } from "../../assets";
import SelectInput from "../../components/elements/input/select-input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function UserSelectInput(props: Props) {
  const realm = useRealm();

  const users = (realm.user?.objects("User") as unknown as User[]) || [];

  return (
    <SelectInput
      options={users.map((user) => ({
        label: user.email,
        value: `${user._id}`,
      }))}
      value={props.value}
      placeholder={"Select User"}
      onChange={(value) => props.onChange(value as string)}
      leftSection={<UserIcon size={24} />}
    />
  );
}
