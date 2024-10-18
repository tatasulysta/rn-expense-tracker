import React from "react";
import Realm from "realm";
import {
  categoryConfig,
  mutationConfig,
  User,
  userConfig,
  walletConfig,
} from "../store/auth.schema";

interface RealmState {
  user: null | Realm;
  category: null | Realm;
  mutation: null | Realm;
  wallet: null | Realm;
}

export const RealmContext = React.createContext<RealmState>({
  category: null,
  user: null,
  mutation: null,
  wallet: null,
});

export const RealmProvider = ({ children }) => {
  const [user, setUser] = React.useState<null | Realm>(null);
  const [category, setCategory] = React.useState<null | Realm>(null);

  const [mutation, setMutation] = React.useState<null | Realm>(null);

  const [wallet, setWallet] = React.useState<null | Realm>(null);

  React.useEffect(() => {
    const openRealms = async () => {
      const openedUser = await Realm.open(userConfig);
      const openedCategory = await Realm.open(categoryConfig);
      const openedMutation = await Realm.open(mutationConfig);
      const openedWallet = await Realm.open(walletConfig);
      setCategory(openedCategory);
      setUser(openedUser);
      setMutation(openedMutation);
      setWallet(openedWallet);
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
      if (wallet) {
        wallet.close();
      }
      if (mutation) mutation.close();
    };
  }, []);

  return (
    <RealmContext.Provider value={{ category, user, mutation, wallet }}>
      {children}
    </RealmContext.Provider>
  );
};

export function useRealm() {
  return React.useContext(RealmContext);
}
