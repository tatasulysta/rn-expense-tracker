import { styled } from "nativewind";
import { Text, View } from "react-native";
import TextInput from "../components/elements/text-input";
import { EmailIcon, PasswordIcon } from "../assets";
import Button from "../components/elements/button";
import { FormProvider, useForm } from "react-hook-form";
import { StyledView } from "../components/common";
import { UserCreateInput, UserType } from "../store/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "../components/elements/text-input-field";
import SubmitButton from "../components/elements/submit-button";
const defaultValues: UserCreateInput = {
  defaultBaseRate: "",
  email: "",
  password: "",
  type: UserType.User,
};

export default function Home() {
  const resolver = yupResolver(
    Yup.object({
      defaultBaseRate: Yup.string().required().nullable(),
      email: Yup.string().email().required().nullable(),
      password: Yup.string().required().nullable(),
    }),
  );

  const methods = useForm({ mode: "onChange", defaultValues, resolver });
  const onSubmit = (values: UserCreateInput) => {
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <StyledView className="flex flex-end justify-end flex-1 pb-10 px-4">
        <StyledView className="flex flex-col" style={{ gap: 32 }}>
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            icon={(size) => <EmailIcon size={size} />}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            icon={(size) => <PasswordIcon size={size} />}
          />
          {/* <InputField
          type="default "
          name="password"
          placeholder="Password"
          icon={(size) => <PasswordIcon size={size} />}
        /> */}
          <SubmitButton onSubmit={onSubmit} fill>
            Register
          </SubmitButton>
        </StyledView>
      </StyledView>
    </FormProvider>
  );
}
