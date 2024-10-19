import React from "react";
import { StyledText, StyledView } from "../../../components/common";
import DefaultScrollView from "../../../components/common/scroll-view";
import DefaultFlatList from "../../../components/common/flat-list";
import { CategoryIcon, CategoryIconKey } from "../helper";
import { BaseButton } from "../../../components/elements/button";

interface Props {
  value: string;
  onChange: (val: string) => void;
  color: string;
}

export default function IconSelector(props: Props) {
  return (
    <StyledView className="gap-y-2">
      <StyledText className="text-base">Choose Icon</StyledText>
      <DefaultScrollView horizontal>
        <DefaultFlatList
          data={CategoryIconKey}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{ gap: 8 }}
          numColumns={6}
          renderItem={({ item }) => (
            <BaseButton
              className={`${props.color} p-2 rounded-md
                ${
                  props.value === item && " border-1 border-black border-solid"
                }`}
              onPress={() => props.onChange(item)}
            >
              {CategoryIcon[item]({ size: 32 })}
            </BaseButton>
          )}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <StyledView className="w-full h-2" />}
        ></DefaultFlatList>
      </DefaultScrollView>
    </StyledView>
  );
}
