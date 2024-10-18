import { useNavigation as useRawNavigation } from "@react-navigation/native";
import { StackNavigationType } from "../../router";

export const useNavigation = useRawNavigation<StackNavigationType<any>>;
