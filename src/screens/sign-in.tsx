import React from "react";
import { StyledText, StyledView } from "../components/common";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import DefaultLayout from "../components/layout/default-layout";
import Input from "../components/elements/field";
import { EmailIcon, PasswordIcon } from "../assets";
import SubmitButton from "../components/elements/submit-button";
import { sign } from "react-native-pure-jwt";
import { SECRET_KEY } from "../utils/constants";
import { useCredential } from "../hooks/use-credential";
import Realm from "realm";
import { SIGN_IN_SCREEN_ROUTE, SIGN_UP_SCREEN_ROUTE } from "../../router-type";
import { Keyboard } from "react-native";
import { StackNavigationScreenProps } from "../../router";
import { useRealm } from "../hooks/use-realm";
import { useNavigation } from "../hooks/use-navigation";
import Button from "../components/elements/button";
import DefaultScrollView from "../components/common/scroll-view";
import { toast } from "../utils/notification";

type FormType = {
  password: string;
  email: string;
};

const defaultValues: FormType = {
  email: "",
  password: "",
};

const resolver = yupResolver<FormType>(
  Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  }),
);

export default function SignIn() {
  const realm = useRealm();
  const { navigate, reset } = useNavigation();
  const { setCredential, credential } = useCredential();
  const goToMain = () =>
    reset({
      index: 0,
      routes: [{ name: "Main" }],
    });

  React.useEffect(() => {
    if (credential?.user?._id) {
      goToMain();
    }
  }, [credential?.user?._id]);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver,
  });

  const onSubmit = async (values: FormType) => {
    try {
      Keyboard.dismiss();
      const user = realm
        .user!.objects("User")
        .filtered(`email = "${values.email}"`)[0];
      if (user) {
        const isValidPassword = values.password === user.password;

        if (isValidPassword) {
          const token = await sign(
            {
              iss: values.email,
              exp: new Date().getTime() + 3600 * 1000,
            },
            SECRET_KEY,
            {
              alg: "HS256",
            },
          );
          setCredential({ ...(user as any), token });
          goToMain();
        } else throw new Error("Email/Password inccorect!");
      } else throw new Error("Email/Password inccorect!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <DefaultLayout className="justify-center">
      <DefaultScrollView>
        <FormProvider {...methods}>
          <StyledView className="flex flex-col" style={{ gap: 32 }}>
            <StyledView className="flex justify-center items-center gap-1 mt-3">
              <StyledText className="text-xl text-center">
                Hi,Welcome Back!
              </StyledText>
            </StyledView>

            <Input
              type="email"
              name="email"
              placeholder="Email"
              icon={(size) => <EmailIcon size={size} />}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              icon={(size) => <PasswordIcon size={size} />}
            />

            <SubmitButton onSubmit={onSubmit} fill>
              Sign In
            </SubmitButton>
            <StyledView className="flex flex-row gap-1">
              <StyledText className="text-base">
                Don't have an account?
              </StyledText>
              <StyledText
                className="text-base text-blue-700 font-semibold"
                onPress={() => navigate(SIGN_UP_SCREEN_ROUTE)}
              >
                Sign Up
              </StyledText>
            </StyledView>
          </StyledView>
        </FormProvider>
      </DefaultScrollView>
    </DefaultLayout>
  );
}
