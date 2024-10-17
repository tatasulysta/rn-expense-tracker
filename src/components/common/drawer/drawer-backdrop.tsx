import React, { useCallback, useEffect } from "react";
import {
  BackHandler,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyledView } from "../../common";

interface Props {
  children: React.ReactNode;
  cancelable?: boolean;
  onClose: () => void;
  noSafeArea?: boolean;
  className?: string;
}

const { height } = Dimensions.get("screen");

export default function DrawerBackdrop(props: Props) {
  const {
    children,
    onClose,
    className,
    noSafeArea = false,
    cancelable = true,
  } = props;
  const offset = useSharedValue(height);
  const onCancel = useCallback(() => {
    if (cancelable) {
      onClose();
    }
  }, [cancelable, onClose]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onCancel();
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, [onCancel]);

  const animated = useAnimatedStyle(() => ({
    backgroundColor: withTiming("#00000040", {
      duration: 300,
      easing: Easing.linear,
    }),
  }));

  const animatedHeight = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: offset.value,
      },
    ],
  }));

  useEffect(() => {
    offset.value = withTiming(0, {
      duration: 500,
      easing: Easing.ease,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[styles.container, animated]}>
      {!noSafeArea && <SafeAreaView />}
      <TouchableWithoutFeedback accessibilityRole="none" onPress={onCancel}>
        <Animated.View style={[styles.animatedContent, animatedHeight]}>
          <StyledView
            onStartShouldSetResponder={(_) => true}
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
            className={[className, "w-full items-center"].join("")}
          >
            {children}
          </StyledView>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!noSafeArea && <SafeAreaView />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "transparent",
  },
  animatedContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
