import * as React from "react";
import { localStorage } from "../helpers/local-storage";
import { User } from "../store/auth.schema";

export type CredentialModel = {
  user: (User & { token: string }) | undefined;
};

export interface CredentialStateProps {
  credential?: CredentialModel;
  setCredential: React.Dispatch<React.SetStateAction<any>>;
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
      setCredential: async (credential) => {
        if (!credential) {
          await localStorage.removeItem("credential");
          setUserCredential(undefined);
        } else {
          await localStorage.setItem("credential", JSON.stringify(credential));
          setUserCredential(credential);
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
  const context = React.useContext(CredentialContext);
  return context;
}
