import Constants from "expo-constants";
import React, { ReactNode } from "react";
import {
  LayoutChangeEvent,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import { useNavigation } from "../../hooks/use-navigation";
import { StyledText } from "../common";
import Button, { BaseButton } from "../elements/button";
import { ArrowLeftIcon, CaretLeftIcon } from "../../assets";

interface Props {
  back?: boolean;
  onBackPress?: () => void;
  title?: string;
}

export const HEADER_HEIGHT = Platform.OS === "ios" ? 50 : 64;

const AnimatedView = Animated.View;

export default function Header(props: Props) {
  const [width, setWidth] = React.useState<number | undefined>();
  const { back = true, title, onBackPress } = props;

  const { goBack, canGoBack } = useNavigation();

  const close = React.useCallback(() => {
    if (!onBackPress && canGoBack()) {
      goBack();
    }
    onBackPress?.();
  }, [canGoBack, goBack, onBackPress]);

  const onLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      if (!width || e.nativeEvent.layout.width > width) {
        setWidth(e.nativeEvent.layout.width);
      }
    },
    [width],
  );

  return (
    <AnimatedView style={StyleSheet.flatten([styles.wrapper])}>
      <AnimatedView style={[styles.container, { paddingHorizontal: 16 }]}>
        {back && (
          <View onLayout={onLayout}>
            <Button
              size="small"
              onPress={close}
              variant="outlined"
              className="border-0 py-2 bg-white"
            >
              <CaretLeftIcon size={20} />
            </Button>
          </View>
        )}

        <StyledText className="text-xl self-center">{title}</StyledText>
      </AnimatedView>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    zIndex: 1,
    height: HEADER_HEIGHT,
    backgroundColor: "white",
    width: "100%",
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    flex: 1,
    gap: 12,
    // paddingHorizontal: 16,
    height: HEADER_HEIGHT,
  },
  titleContainer: {},
});
