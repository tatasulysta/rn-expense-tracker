import { withExpoSnack } from "nativewind";
import Route from "./router";

import Credential, { CredentialModel } from "./src/hooks/use-credential";
import React from "react";
import { DrawerProvider } from "./src/hooks/use-drawer";
import { RealmProvider } from "./src/hooks/use-realm";
import { LOCAL_STORAGE_KEY } from "./src/utils/constants";
import { localStorage } from "./src/helpers/local-storage";
import Toast from "react-native-toast-message";

function App() {
  const [persistState, setPersistState] = React.useState<CredentialModel>({
    user: undefined,
    isLoading: true,
  });

  React.useEffect(() => {
    async function exec() {
      const credential = (await localStorage.getItem(
        LOCAL_STORAGE_KEY.credential,
      )) as any;
      setPersistState({
        user: credential ? JSON.parse(credential) : undefined,
        isLoading: false,
      });
    }

    exec();
  }, []);

  if (persistState.isLoading) {
    return <></>;
  }
  return (
    <>
      <Credential credential={persistState}>
        <DrawerProvider>
          <RealmProvider>
            <Route />
          </RealmProvider>
        </DrawerProvider>
      </Credential>
      <Toast position="top" />
    </>
  );
}

export default withExpoSnack(App);
