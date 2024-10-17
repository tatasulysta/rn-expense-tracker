import * as React from "react";
import { FlatList } from "react-native";
import { FlatListProps } from "react-native/types";

const DefaultFlatList = React.forwardRef<FlatList, FlatListProps<any>>(
  (props, ref) => {
    const { indicatorStyle = "black", ...rest } = props;
    return <FlatList ref={ref} {...rest} indicatorStyle={indicatorStyle} />;
  },
);

DefaultFlatList.displayName = "DefaultFlatList";

export default DefaultFlatList;
