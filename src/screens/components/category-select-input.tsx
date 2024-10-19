import React from "react";
import { useRealm } from "../../hooks/use-realm";
import { Category } from "../../store/auth.schema";
import DefaultScrollView from "../../components/common/scroll-view";
import CategoryButton from "./category";
import { useController } from "react-hook-form";

interface Props {
  userId: string;
  name: string;
}

// ERROR SHOULD BE HANDLE MANUALLY
export default function CategorySelectInput(props: Props) {
  const realm = useRealm();

  const { userId, name } = props;
  const {
    field: { onChange, value },
  } = useController({ name });

  const categories = React.useMemo<Category[]>(() => {
    return (
      (realm.category
        ?.objects("Category")
        .filtered(`userId == $0`, userId) as unknown as Category[]) || []
    );
  }, [realm.category]);

  return (
    <DefaultScrollView className="gap-4 flex-grow-0 p-4 bg-white">
      {categories.map((category, index) => (
        <CategoryButton
          key={index}
          color={category.color}
          icon={category.icon}
          label={category.label}
          onPress={() => onChange(category._id)}
          isActive={value === category._id}
        />
      ))}
    </DefaultScrollView>
  );
}
