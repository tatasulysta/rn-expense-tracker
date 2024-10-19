import React from "react";
import DefaultLayout from "../../components/layout/default-layout";
import { StyledText, StyledView } from "../../components/common";
import TextInput from "../../components/elements/input/text-input";
import { CategoryColor, CategoryIcon, CategoryIconKey } from "./helper";
// import { useCredential } from "../../hooks/use-credential";
import DefaultFlatList from "../../components/common/flat-list";
import Button, { BaseButton } from "../../components/elements/button";
import { useCredential } from "../../hooks/use-credential";
import {
  Category,
  CategoryCreateInput,
  CategoryType,
  UserTypeEnum,
} from "../../store/auth.schema";
import { useRealm } from "../../hooks/use-realm";
import DefaultScrollView from "../../components/common/scroll-view";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { useNavigation } from "../../hooks/use-navigation";
import { MUTATION_SCREEN_ROUTE } from "../../../router-type";
import { useForm } from "react-hook-form";
import ColorSelector from "./components/color-selector";
import IconSelector from "./components/icon-selector";
import UserSelectInput from "../components/user-state-select-input";
import Header from "../../components/widgets/header";
interface Props {
  category?: Category;
}

const validation = (isAdmin: boolean) =>
  Yup.object({
    color: Yup.string().required(),
    icon: Yup.string().required(),
    label: Yup.string().required(),
    ...(isAdmin && {
      userId: Yup.string().required(),
    }),
  });

export default function CategoryForm(props: Props) {
  const { category } = props;
  const { credential } = useCredential();
  const { navigate } = useNavigation();
  const realm = useRealm();
  const [color, setColor] = React.useState<string>(CategoryColor[0]);
  const [icon, setIcon] = React.useState<string>(CategoryIconKey[0]);

  const [label, setLabel] = React.useState<string>("");
  const [userId, setUserId] = React.useState<string>("");

  const isAdmin = credential?.user?.type === UserTypeEnum.Admin;
  const onSave = async () => {
    const values = {
      color,
      label,
      icon,
      userId,
    };

    try {
      await validation(isAdmin).validate(values);
      if (category) {
        realm.category!.write(() => {
          category.color = color;
          category.label = label;
          category.icon = icon;
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
      navigate(MUTATION_SCREEN_ROUTE);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DefaultLayout
      header={<Header title={`${category ? "Edit" : "New"} Category`} />}
    >
      <DefaultScrollView className="flex flex-1 gap-6">
        {/* PREVIEW */}
        <StyledView className="flex-1 flex flex-grow-0 max-w-60">
          <StyledView
            className={[
              color,
              "flex-grow-0 self-center p-2 items-center rounded-lg",
            ].join(" ")}
          >
            {CategoryIcon[icon]({ size: 50 })}
            <StyledText className="text-base max-w-fit text-center text-ellipsis text-nowrap">
              {label}
            </StyledText>
          </StyledView>
        </StyledView>
        {isAdmin && (
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
