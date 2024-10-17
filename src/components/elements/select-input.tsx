import * as React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BaseButton } from "./button";
import { StyledText, StyledView } from "../common";
import InputBaseWrapper, { InputBaseProps } from "./input-base-wrapper";
import DefaultFlatList from "../common/flat-list";
import DrawerBackdrop from "../common/drawer/drawer-backdrop";
import DrawerBody from "../common/drawer/drawer-body";
import useDrawer from "../../hooks/use-drawer";

export interface ISelectInputOption {
  value: string | number;
  label: string | number | null;
}

export interface SelectInputProps extends InputBaseProps {
  disabled?: boolean;
  placeholder?: string | null;
  label?: string | null;
  noMargin?: boolean;
  value?: string | number;
  options: ISelectInputOption[];
  description?: string | null;
  optional?: boolean;
  onChange?: (value: string | number) => void;
  snapPoints?: (string | number)[];
  title?: string | null;
}

export default function SelectInput(props: SelectInputProps) {
  const {
    options,
    value,
    placeholder,
    disabled,
    onChange,
    snapPoints,
    title,
    error,
    leftSection,
    rightSection,

    ...rest
  } = props;
  const { bottom: safeBottomArea } = useSafeAreaInsets();
  const drawer = useDrawer();

  const selectedValue = React.useMemo(
    () => options.find((curr) => curr.value === value),
    [options, value],
  );

  const handleOpen = () => {
    drawer!.showCustom({
      render: (dismiss) => (
        <DrawerBackdrop noSafeArea onClose={dismiss}>
          <DrawerBody style={{ width: "100%" }}>
            {title ? (
              <StyledView>
                <StyledText>{title}</StyledText>
              </StyledView>
            ) : (
              <></>
            )}
            <DefaultFlatList
              contentContainerStyle={{
                paddingBottom: safeBottomArea,
                paddingHorizontal: 16,
              }}
              data={options}
              renderItem={({ item }) => (
                <BaseButton
                  accessibilityRole="button"
                  onPress={() => {
                    dismiss();
                    onChange?.(item.value);
                  }}
                  // style={styles.item}
                >
                  <StyledText

                  //   style={StyleSheet.flatten([
                  //     !!value &&
                  //       selectedValue?.value === item.value &&
                  //       styles.selectedOption,
                  //   ])}
                  >
                    {item.label}
                  </StyledText>
                </BaseButton>
              )}
              keyExtractor={(item) => item.value}
            />
          </DrawerBody>
        </DrawerBackdrop>
      ),
    });
  };

  return (
    <InputBaseWrapper
      error={error}
      leftSection={leftSection}
      rightSection={rightSection}
    >
      <TouchableHighlight
        accessibilityRole="button"
        underlayColor={"#00000000"}
        onPress={handleOpen}
        disabled={disabled}
      >
        <View
          style={StyleSheet.flatten([
            // styles.fieldContainer,
            // disabled && styles.disabledField,
            // !!rest.error && {
            //   borderColor: color.border.error,
            // },
          ])}
        >
          <StyledText
          // style={StyleSheet.flatten([
          //   disabled && styles.disabledText,
          //   !value && styles.placeholder,
          // ])}
          >
            {selectedValue?.label || placeholder}
          </StyledText>
        </View>
      </TouchableHighlight>
    </InputBaseWrapper>
  );
}
