import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledView } from "../common";

import { RealmProvider } from "@realm/react";
import { User } from "../../store/auth.schema";

interface Props extends React.PropsWithChildren {
  className?: string;
}
export default function DefaultLayout(props: Props) {
  return (
    <RealmProvider schema={[User]}>
      <SafeAreaView>
        <StyledView
          className={["flex flex-1 px-4 h-full", props.className].join(" ")}
        >
          {props.children}
        </StyledView>
      </SafeAreaView>
    </RealmProvider>
  );
}
