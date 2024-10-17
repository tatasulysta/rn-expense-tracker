import { RealmProvider } from "@realm/react";

import { withExpoSnack } from "nativewind";
import Route from "./router";
import { User } from "./src/store/auth.schema";
import Credential, { CredentialModel } from "./src/hooks/use-credential";
import React from "react";
import { DrawerProvider } from "./src/hooks/use-drawer";

function App() {
  const [persistState, setPersistState] = React.useState<CredentialModel>({
    user: undefined,
  });

  React.useEffect(() => {
    async function exec() {
      const credential = (await localStorage.getItem("credential")) as any;
      setPersistState({
        user: credential ? JSON.parse(credential) : undefined,
      });
    }

    exec();
  }, []);

  return (
    <RealmProvider schema={[User]}>
      <Credential credential={persistState}>
        <DrawerProvider>
          <Route />
        </DrawerProvider>
      </Credential>
    </RealmProvider>
  );
}

export default withExpoSnack(App);
