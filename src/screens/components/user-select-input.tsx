import React from "react";
import { useRealm } from "../../hooks/use-realm";
import { User, UserTypeEnum } from "../../store/auth.schema";
import Input from "../../components/elements/field";
import { UserIcon } from "../../assets";

interface Props {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  excludeAdmin?: boolean;
}

export default function UserSelectInput(props: Props) {
  const realm = useRealm();
  const { name, ...rest } = props;
  const { excludeAdmin } = props;

  const users = React.useMemo(() => {
    const _users = (realm.user?.objects("User") as unknown as User[]) || [];
    return excludeAdmin
      ? _users.filter((user) => user.type !== UserTypeEnum.Admin)
      : _users;
  }, [realm.user, excludeAdmin]);

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
