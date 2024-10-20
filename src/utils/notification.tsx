import rawToast from "react-native-toast-message";

export const toast = {
  error: (message: string) =>
    rawToast.show({
      type: "error",
      text1: message,
    }),
  success: (message: string) =>
    rawToast.show({
      type: "success",
      text1: message,
    }),
};
