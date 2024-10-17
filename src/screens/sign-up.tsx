import { EmailIcon, PasswordIcon } from "../assets";
import { FormProvider, useForm } from "react-hook-form";
import { UserCreateInput } from "../store/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "../components/elements/field/text-input-field";
import SubmitButton from "../components/elements/submit-button";
import DefaultLayout from "../components/layout/default-layout";
import { StyledView } from "../components/common";
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

  return (
    <DefaultLayout>
      <FormProvider {...methods}>
        <StyledView className="flex flex-end justify-end flex-1">
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
    </DefaultLayout>
  );
}
