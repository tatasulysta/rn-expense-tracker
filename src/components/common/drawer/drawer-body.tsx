import * as React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { StyledView } from "../../common";
import { StyledProps } from "nativewind";

export interface DrawerBodyProps extends StyledProps<ViewProps> {}

const DrawerBody = React.forwardRef<View, DrawerBodyProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <StyledView ref={ref} className={`${className} rounded-md`} {...rest} />
  );
});

DrawerBody.displayName = "DrawerBody";

export default DrawerBody;
