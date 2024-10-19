import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledView } from "../common";

interface Props extends React.PropsWithChildren {
  className?: string;
  header?: React.ReactNode;
}

export default function DefaultLayout(props: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledView
        className={`flex-1 px-2 ${props.className} bg-white relative`}
      >
        {props.header}
        {props.children}
      </StyledView>
    </SafeAreaView>
  );
}
