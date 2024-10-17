import { styled } from "nativewind";
import { Text, View } from "react-native";
import TextInput from "../components/elements/input/text-input";
import { EmailIcon, PasswordIcon } from "../assets";
import Button from "../components/elements/button";
import { FormProvider, useForm } from "react-hook-form";
import { StyledText, StyledView } from "../components/common";
import { UserCreateInput } from "../store/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "../components/elements/field/text-input-field";
import SubmitButton from "../components/elements/submit-button";
import SelectInput from "../components/elements/input/select-input";
import React from "react";
const defaultValues: UserCreateInput = {
  defaultBaseRate: "",
  email: "",
  password: "",
  type: "",
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
  const [value, setValue] = React.useState<string>("");

  return (
    <FormProvider {...methods}>
      <StyledView className="flex flex-end justify-end flex-1 pb-10 px-4">
        <StyledView className="flex flex-col" style={{ gap: 32 }}>
          <StyledText>heheh</StyledText>
          <SelectInput
            value={value}
            onChange={(value) => setValue(value as string)}
            options={[
              {
                label: "TEST",
                value: "test1",
              },
              {
                label: "TES2",
                value: "test2",
              },
            ]}
          />
          <StyledText>heheh</StyledText>
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
