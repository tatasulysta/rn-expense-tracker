import * as React from "react";
import { TouchableHighlight } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BaseButton } from "../button";
import { StyledText, StyledView } from "../../common";
import InputBaseWrapper, { InputBaseProps } from "./input-base-wrapper";
import DefaultFlatList from "../../common/flat-list";
import DrawerBackdrop from "../../common/drawer/drawer-backdrop";
import DrawerBody from "../../common/drawer/drawer-body";
import useDrawer from "../../../hooks/use-drawer";

export interface SelectInputOption {
  value: string | number;
  label: string | number | null;
}

export interface SelectInputProps extends InputBaseProps {
  disabled?: boolean;
  placeholder?: string | null;
  noMargin?: boolean;
  value?: string | number;
  options: SelectInputOption[];
  description?: string | null;
  optional?: boolean;
  onChange?: (value: string | number) => void;
  snapPoints?: (string | number)[];
  title?: string | null;
  editable?: boolean;
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
          <DrawerBody className="w-full bg-white p-6">
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
                  className="p-2 border-b-1 border-blue-500 border-solid"
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
        <StyledText
          className={[
            "font-normal",
            selectedValue?.label ? "text-black" : "text-neutral-400",
          ].join(" ")}
        >
          {selectedValue?.label || placeholder}
        </StyledText>
      </TouchableHighlight>
    </InputBaseWrapper>
  );
}
