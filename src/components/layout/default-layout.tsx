import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledView } from "../common";
import { useCredential } from "../../hooks/use-credential";
import { useFocusEffect } from "@react-navigation/native";
import { decode } from "react-native-pure-jwt";
import { SECRET_KEY } from "../../utils/constants";
import { useNavigation } from "../../hooks/use-navigation";
import { SIGN_IN_SCREEN_ROUTE } from "../../../router-type";
import { toast } from "../../utils/notification";
interface Props extends React.PropsWithChildren {
  className?: string;
  header?: React.ReactNode;
}

export default function DefaultLayout(props: Props) {
  const { credential, setCredential } = useCredential();
  const { reset } = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const logout = () => {
        setCredential(undefined);

        reset({
          index: 0,
          routes: [{ name: SIGN_IN_SCREEN_ROUTE }],
        });
      };
      async function checkToken() {
        try {
          const token = credential?.user?.token;

          if (token) {
            const decodedToken = await decode(token, SECRET_KEY);

            const isTokenExpired =
              (decodedToken.payload as any).exp < Date.now() / 1000;
            if (isTokenExpired) logout();
          }
        } catch (error: any) {
          logout();
          toast.error(error?.message);
        }
      }
      checkToken();
    }, [credential?.user?.token]),
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledView
        className={`flex-1 px-2 ${props.className} bg-white relative`}
      >
        {props.header}
        {props.children}
      </StyledView>
    </SafeAreaView>
  );
}
