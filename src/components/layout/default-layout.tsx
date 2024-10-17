import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledView } from "../common";
import Credential, { CredentialModel } from "../../hooks/use-credential";
import { RealmProvider } from "@realm/react";
import { User } from "../../store/auth.schema";

export default function DefaultLayout(props: React.PropsWithChildren) {
  return (
    <SafeAreaView>
      <StyledView className="flex flex-1 px-4">{props.children}</StyledView>
    </SafeAreaView>
  );
}
