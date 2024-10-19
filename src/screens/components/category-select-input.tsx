import React from "react";
import { useRealm } from "../../hooks/use-realm";
import { Category } from "../../store/auth.schema";
import DefaultScrollView from "../../components/common/scroll-view";
import CategoryButton from "./category";
import { useController } from "react-hook-form";
import InputBaseWrapper from "../../components/elements/input/input-base-wrapper";
import DefaultFlatList from "../../components/common/flat-list";

interface Props {
  userId: string;
  name: string;
  label?: string;
  onAfterChange?: (value: string) => void;
}

export default function CategorySelectInput(props: Props) {
  const realm = useRealm();

  const { userId, name } = props;
  const {
    field: { onChange, value },
    fieldState,
  } = useController({ name });

  const categories = React.useMemo<Category[]>(() => {
    return (
      (realm.category
        ?.objects("Category")
        .filtered(`userId == $0`, userId) as unknown as Category[]) || []
    );
  }, [realm.category]);

  return (
    <InputBaseWrapper
      label={props.label}
      error={(fieldState.error && fieldState.error?.message) || ""}
    >
      <DefaultScrollView horizontal>
        <DefaultFlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{ gap: 8 }}
          numColumns={8}
          data={categories}
          renderItem={({ item: category, index }) => (
            <CategoryButton
              key={index}
              color={category.color}
              icon={category.icon}
              label={category.label}
              onPress={() => {
                onChange(`${category._id}`);
                props.onAfterChange?.(category.label);
              }}
              isActive={value === `${category._id}`}
            />
          )}
        ></DefaultFlatList>
      </DefaultScrollView>
    </InputBaseWrapper>
  );
}
