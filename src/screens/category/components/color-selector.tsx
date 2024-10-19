import React from "react";
import { useController } from "react-hook-form";
import { StyledText, StyledView } from "../../../components/common";
import DefaultScrollView from "../../../components/common/scroll-view";
import DefaultFlatList from "../../../components/common/flat-list";
import { CategoryColor } from "../helper";
import { BaseButton } from "../../../components/elements/button";
interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function ColorSelector(props: Props) {
  return (
    <StyledView className="gap-y-2">
      <StyledText className="text-base">Choose Background Color</StyledText>
      <DefaultScrollView horizontal>
        <DefaultFlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{ gap: 8 }}
          data={CategoryColor}
          numColumns={15}
          renderItem={({ item }) => (
            <BaseButton
              className={[
                item,
                "p-2 rounded-md",
                props.value === item && "border-1 border-black border-solid",
              ].join(" ")}
              style={{ width: 32, height: 32 }}
              onPress={() => props.onChange(item)}
            ></BaseButton>
          )}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <StyledView className="w-full h-2" />}
        ></DefaultFlatList>
      </DefaultScrollView>
    </StyledView>
  );
}
