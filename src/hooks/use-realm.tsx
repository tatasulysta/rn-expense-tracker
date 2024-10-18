import React from "react";
import Realm from "realm";
import { categoryConfig, User, userConfig } from "../store/auth.schema";

interface RealmState {
  user: null | Realm;
  category: null | Realm;
}

export const RealmContext = React.createContext<RealmState>({
  category: null,
  user: null,
});

export const RealmProvider = ({ children }) => {
  const [user, setUser] = React.useState<null | Realm>(null);
  const [category, setCategory] = React.useState<null | Realm>(null);

  React.useEffect(() => {
    const openRealms = async () => {
      const openedUser = await Realm.open(userConfig);
      const openedCategory = await Realm.open(categoryConfig);
      setCategory(openedCategory);
      setUser(openedUser);
    };
    openRealms();

    // Close Realms when component unmounts
    return () => {
      if (user) {
        user.close();
      }
      if (category) {
        category.close();
      }
    };
  }, []);
  console.log("this is from the provider", category, "user", user);
  return (
    <RealmContext.Provider value={{ category, user }}>
      {children}
    </RealmContext.Provider>
  );
};

export function useRealm() {
  return React.useContext(RealmContext);
}
