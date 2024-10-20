import React from "react";
import { useRealm } from "../../hooks/use-realm";
import { User, UserTypeEnum } from "../../store/auth.schema";
import { UserIcon } from "../../assets";
import SelectInput from "../../components/elements/input/select-input";

interface Props {
  value: string;
  onChange: (value: string) => void;
  excludeAdmin?: boolean;
}

export default function UserSelectInput(props: Props) {
  const realm = useRealm();
  const { excludeAdmin } = props;

  const users = React.useMemo(() => {
    const _users = (realm.user?.objects("User") as unknown as User[]) || [];
    return excludeAdmin
      ? _users.filter((user) => user.type !== UserTypeEnum.Admin)
      : _users;
  }, [realm.user, excludeAdmin]);

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
