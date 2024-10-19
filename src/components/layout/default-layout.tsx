import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledView } from "../common";

interface Props extends React.PropsWithChildren {
  className?: string;
  header?: React.ReactNode;
}
export default function DefaultLayout(props: Props) {
  return (
    <>
      <SafeAreaView>
        {props.header}
        <StyledView
          className={`w-full px-4 h-full ${props.className} bg-white`}
        >
          {props.children}
        </StyledView>
      </SafeAreaView>
    </>
  );
}
