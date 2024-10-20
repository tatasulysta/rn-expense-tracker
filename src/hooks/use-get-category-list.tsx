import React from "react";
import { Category } from "../store/auth.schema";
import { useRealm } from "./use-realm";
import { useCredential } from "./use-credential";

export default function useGetCategoryList(props?: { userId: string }) {
  const realm = useRealm();

  const { credential } = useCredential();

  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    if (realm.category) {
      const categoryData = realm.category
        ?.objects("Category")
        .filtered(`userId == $0`, props?.userId || `${credential?.user?._id}`);

      const _categories = (categoryData || []) as unknown as Category[];
      setCategories([..._categories]);

      const listener = () => setCategories([..._categories]);

      categoryData.addListener(listener);
      return () => {
        categoryData.removeListener(listener);
      };
    }
  }, [realm.category, props?.userId]);

  return { categories };
}
