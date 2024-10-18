import React from "react";
import { StyledText, StyledView } from "../../components/common";
import DefaultFlatList from "../../components/common/flat-list";
import { CategoryColor, CategoryIcon } from "./helper";
// import { useCredential } from "../../hooks/use-credential";
import Button, { BaseButton } from "../../components/elements/button";
import TextInput from "../../components/elements/input/text-input";
import DefaultLayout from "../../components/layout/default-layout";

const CategroyIconKey = Object.keys(CategoryIcon);
export default function CategoryScreen() {
  const [color, setColor] = React.useState<string>();
  // const { credential } = useCredential();

  const titleRef = React.useRef("");

  const onSaveCategory = () => {};

  return (
    <DefaultLayout>
      <StyledText className="text-blue-100"> New Category</StyledText>
      <TextInput
        placeholder="Category Title"
        type="text"
        onChangeText={(text) => (titleRef.current = text)}
      />
      <DefaultFlatList
        data={CategoryColor}
        renderItem={({ item }) => (
          <BaseButton
            className={[item, "p-2"].join(" ")}
            style={{ width: 20, height: 20 }}
          >
            {CategoryIcon[item]({ size: 24 })}
          </BaseButton>
        )}
        keyExtractor={(item) => item}
      ></DefaultFlatList>
      <DefaultFlatList
        data={CategroyIconKey}
        numColumns={4}
        renderItem={({ item }) => (
          <BaseButton className={[color, "p-2"].join(" ")}>
            {CategoryIcon[item]({ size: 24 })}
          </BaseButton>
        )}
        keyExtractor={(item) => item}
      ></DefaultFlatList>

      <Button onPress={onSaveCategory}>Save</Button>
    </DefaultLayout>
  );
}
