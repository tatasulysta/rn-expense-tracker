import * as React from "react";
import { localStorage } from "../helpers/local-storage";
import { User } from "../store/auth.schema";
import { LOCAL_STORAGE_KEY, SECRET_KEY } from "../utils/constants";
import { useFocusEffect } from "@react-navigation/native";
import { decode } from "react-native-pure-jwt";

export type UserModel = (User & { token: string }) | undefined;
export type CredentialModel = {
  user: UserModel;
  isLoading: boolean;
};

export interface CredentialStateProps {
  credential?: CredentialModel;
  setCredential: (params: UserModel) => void;
}

export const CredentialContext = React.createContext<CredentialStateProps>({
  credential: undefined,
  setCredential: () => {},
});

interface Props {
  credential?: CredentialModel;
  children: React.ReactNode;
}

export default function Credential(props: Props) {
  const [userCredential, setUserCredential] = React.useState<
    CredentialModel | undefined
  >(props.credential);

  const { children } = props;

  const value = React.useMemo<CredentialStateProps>(
    () => ({
      credential: userCredential,
      setCredential: async (credential: UserModel) => {
        if (!credential) {
          await localStorage.removeItem(LOCAL_STORAGE_KEY.credential);
          setUserCredential(undefined);
        } else {
          await localStorage.setItem(
            LOCAL_STORAGE_KEY.credential,
            JSON.stringify(credential),
          );
          setUserCredential({ user: credential, isLoading: false });
        }
      },
    }),
    [userCredential],
  );

  return (
    <CredentialContext.Provider value={value}>
      {children}
    </CredentialContext.Provider>
  );
}

export function useCredential() {
  return React.useContext(CredentialContext);
}
