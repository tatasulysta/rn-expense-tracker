import React from "react";
import DefaultLayout from "../../components/layout/default-layout";
import { StyledText, StyledView } from "../../components/common";
import TextInput from "../../components/elements/input/text-input";
import { CategoryColor, CategoryIcon } from "./helper";
// import { useCredential } from "../../hooks/use-credential";
import DefaultFlatList from "../../components/common/flat-list";
import Button, { BaseButton } from "../../components/elements/button";
import { useCredential } from "../../hooks/use-credential";
import { Category, CategoryType } from "../../store/auth.schema";
import { useRealm } from "../../hooks/use-realm";
import DefaultScrollView from "../../components/common/scroll-view";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { MUTATION_SCREEN_ROUTE } from "../../../router-type";
import { useNavigation } from "../../hooks/use-navigation";
interface Props {
  category?: Category;
}

const validation = Yup.object({
  color: Yup.string().required(),
  icon: Yup.string().required(),
  label: Yup.string().required(),
});

const CategoryIconKey = Object.keys(CategoryIcon);
export default function CategoryForm(props: Props) {
  const { category } = props;
  const { credential } = useCredential();
  const { navigate } = useNavigation();
  const { category: realmCategory } = useRealm();
  const [color, setColor] = React.useState<string>(CategoryColor[0]);
  const [icon, setIcon] = React.useState<string>(CategoryIconKey[0]);

  const [label, setLabel] = React.useState<string>("");

  const onSave = async () => {
    const values = {
      color,
      label,
      icon,
    };
    console.log(realmCategory);
    try {
      // await validation.validate(values);
      // if (category) {
      //   realm.category!.write(() => {
      //     category.color = color;
      //     category.label = label;
      //     category.icon = icon;
      //   });
      // } else
      //   realm.category!.write(() => {
      //     realm.category?.create("Category", {
      //       color,
      //       icon,
      //       label: label,
      //       type: CategoryType.Personal,
      //       user: credential?.user,
      //     });
      //   });
      // navigate(MUTATION_SCREEN_ROUTE);
    } catch (e) {
      console.log(e);
    }
  };

  const hehe = {
    "#": "hdhd",
  };
  return (
    <DefaultLayout>
      <DefaultScrollView className="flex flex-1 gap-6">
        <StyledText className="text-xl font-semibold">
          {`${category ? "Edit" : "New"} Category`}
        </StyledText>
        {/* PREVIEW */}
        <StyledView className="flex-1 flex flex-grow-0">
          <StyledView
            className={[
              color,
              "flex-grow-0 self-center p-2 items-center rounded-lg",
            ].join(" ")}
          >
            {CategoryIcon[icon]({ size: 50 })}
            <StyledText className="text-base">{label}</StyledText>
          </StyledView>
        </StyledView>

        <StyledView>
          <TextInput
            placeholder="Enter Category Label"
            type="text"
            value={label}
            onChangeText={(text) => setLabel(text)}
          />
        </StyledView>

        <StyledView className="gap-y-2">
          <StyledText className="text-base">Choose Background Color</StyledText>
          <DefaultScrollView horizontal>
            <DefaultFlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              columnWrapperStyle={styles.flatListColumn}
              data={CategoryColor}
              numColumns={15}
              renderItem={({ item }) => (
                <BaseButton
                  className={[
                    item,
                    "p-2 rounded-md",
                    color === item && "border-1 border-black border-solid",
                  ].join(" ")}
                  style={{ width: 32, height: 32 }}
                  onPress={() => setColor(item)}
                ></BaseButton>
              )}
              keyExtractor={(item) => item}
              ItemSeparatorComponent={() => (
                <StyledView className="w-full h-2" />
              )}
            ></DefaultFlatList>
          </DefaultScrollView>
        </StyledView>

        <StyledView className="gap-y-2">
          <StyledText className="text-base">Choose Icon</StyledText>
          <DefaultScrollView horizontal>
            <DefaultFlatList
              data={CategoryIconKey}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              columnWrapperStyle={styles.flatListColumn}
              numColumns={6}
              renderItem={({ item }) => (
                <BaseButton
                  className={[
                    color,
                    "p-2 rounded-md",
                    icon === item && "border-1 border-black border-solid",
                  ].join(" ")}
                  onPress={() => setIcon(item)}
                >
                  {CategoryIcon[item]({ size: 32 })}
                </BaseButton>
              )}
              keyExtractor={(item) => item}
              ItemSeparatorComponent={() => (
                <StyledView className="w-full h-2" />
              )}
            ></DefaultFlatList>
          </DefaultScrollView>
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
