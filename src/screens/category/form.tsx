import React from "react";
import DefaultLayout from "../../components/layout/default-layout";
import { StyledText, StyledView } from "../../components/common";
import TextInput from "../../components/elements/input/text-input";
import { CategoryColor, CategoryIcon, CategoryIconKey } from "./helper";
// import { useCredential } from "../../hooks/use-credential";
import Button from "../../components/elements/button";
import { useCredential } from "../../hooks/use-credential";
import { Category, CategoryType, UserTypeEnum } from "../../store/auth.schema";
import { useRealm } from "../../hooks/use-realm";
import DefaultScrollView from "../../components/common/scroll-view";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { useNavigation } from "../../hooks/use-navigation";
import { HOME_SCREEN_ROUTE } from "../../../router-type";
import ColorSelector from "./components/color-selector";
import IconSelector from "./components/icon-selector";
import UserSelectInput from "../components/user-state-select-input";
import Header from "../../components/widgets/header";
import { toast } from "../../utils/notification";
interface Props {
  id?: string;
  userId?: string;
}

const validation = (isAdmin: boolean, isEdit: boolean) =>
  Yup.object({
    color: Yup.string().required(),
    icon: Yup.string().required(),
    label: Yup.string().required(),
    ...(isAdmin &&
      !isEdit && {
        userId: Yup.string().required(),
      }),
  });

export default function CategoryForm(props: Props) {
  const { id, userId: _userId } = props;
  const { credential } = useCredential();
  const { navigate } = useNavigation();
  const realm = useRealm();
  const category = id
    ? realm.category!.objectForPrimaryKey("Category", props.id)
    : undefined;
  const _category = category as unknown as Category | undefined;
  const [color, setColor] = React.useState<string>(
    _category?.color || CategoryColor[0],
  );
  const [icon, setIcon] = React.useState<string>(
    _category?.icon || CategoryIconKey[0],
  );

  const [label, setLabel] = React.useState<string>(_category?.label || "");
  const [userId, setUserId] = React.useState<string>(_userId || "");

  const isAdmin = credential?.user?.type === UserTypeEnum.Admin;
  const onSave = async () => {
    const values = {
      color,
      label,
      icon,
      userId,
    };

    try {
      await validation(isAdmin, !!id).validate(values);
      if (id) {
        realm.category!.write(() => {
          category!.color = color;
          category!.label = label;
          category!.icon = icon;
        });
      } else
        realm.category!.write(() => {
          realm.category?.create("Category", {
            color,
            icon,
            label: label,
            type: CategoryType.Personal,
            userId: isAdmin ? userId : credential?.user?._id.toString(),
          });
        });
      navigate(HOME_SCREEN_ROUTE);
    } catch (e: any) {
      toast.error(e?.message);
    }
  };

  return (
    <DefaultLayout
      header={<Header title={`${id ? "Edit" : "New"} Category`} />}
    >
      <DefaultScrollView className="flex flex-1 gap-6">
        {/* PREVIEW */}
        <StyledView className="flex-1 flex justify-center max-w-60 ">
          <StyledView
            className={`flex-grow-0 self-center p-2 items-center rounded-lg ${color}`}
          >
            {CategoryIcon[icon]({ size: 50 })}
            <StyledText className="text-base max-w-fit text-center text-ellipsis text-nowrap">
              {label}
            </StyledText>
          </StyledView>
        </StyledView>
        {isAdmin && !id && (
          <StyledView>
            <UserSelectInput
              value={userId}
              onChange={(value) => setUserId(value)}
            />
          </StyledView>
        )}
        <StyledView>
          <TextInput
            placeholder="Enter Category Label"
            type="text"
            value={label}
            onChangeText={(text) => setLabel(text)}
          />
        </StyledView>
        <StyledView>
          <ColorSelector value={color} onChange={(value) => setColor(value)} />
        </StyledView>
        <StyledView>
          <IconSelector
            value={icon}
            onChange={(value) => setIcon(value)}
            color={color}
          />
        </StyledView>
        <Button onPress={onSave}>Save</Button>
      </DefaultScrollView>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  flatListColumn: {
    gap: 8,
  },
});
