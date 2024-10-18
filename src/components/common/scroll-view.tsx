import { styled, StyledProps } from "nativewind";
import * as React from "react";
import { ScrollView } from "react-native";
import { ScrollViewProps } from "react-native/types";

const StyledScrollView = styled(ScrollView);
const DefaultScrollView = React.forwardRef<
  ScrollView,
  StyledProps<ScrollViewProps>
>((props, ref) => {
  const { indicatorStyle = "black", ...rest } = props;
  return (
    <StyledScrollView ref={ref} {...rest} indicatorStyle={indicatorStyle} />
  );
});

DefaultScrollView.displayName = "DefaultScrollView";

export default DefaultScrollView;
