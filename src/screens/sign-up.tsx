import { EmailIcon, InfoIcon, PasswordIcon } from "../assets";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  CategoryCreateInput,
  CategoryType,
  User,
  UserCreateInput,
  UserTypeEnum,
  WalletCreateInput,
} from "../store/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SubmitButton from "../components/elements/submit-button";
import DefaultLayout from "../components/layout/default-layout";
import { StyledText, StyledView } from "../components/common";
import Input from "../components/elements/field";
import RateSelectInput from "./components/rate-select-input";
import { useQuery } from "@realm/react";
import RoleSelectInput from "./components/role-select-input";
import { SIGN_IN_SCREEN_ROUTE } from "../../router-type";
import { useNavigation } from "../hooks/use-navigation";
import { useRealm } from "../hooks/use-realm";
import DefaultScrollView from "../components/common/scroll-view";
import { CategoryColor, CategoryIcon } from "./category/helper";
import { format, startOfMonth } from "date-fns";

const defaultValues: UserCreateInput = {
  defaultBaseRate: "",
  email: "",
  password: "",
  type: UserTypeEnum.User,
};

const resolver = yupResolver<UserCreateInput>(
  Yup.object({
    defaultBaseRate: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    type: Yup.string()
      .required()
      .oneOf([UserTypeEnum.Admin, UserTypeEnum.User]),
  }),
);

const createCategories = (uId: string): CategoryCreateInput[] => [
  {
    color: CategoryColor[0],
    icon: "activity",
    label: "Activity",
    type: CategoryType.Personal,
    userId: `${uId}`,
  },
  {
    color: CategoryColor[7],
    icon: "money",
    label: "Expense",
    type: CategoryType.Personal,
    userId: `${uId}`,
  },
  {
    color: CategoryColor[12],
    icon: "book",
    label: "Budget",
    type: CategoryType.Personal,
    userId: `${uId}`,
  },
];

export default function SignUp() {
  const { navigate } = useNavigation();

  const realm = useRealm();
  const users = realm.user?.objects("User") as unknown as User[];
  const hasAdmin =
    !users?.length ||
    users.findIndex((user) => user.type === UserTypeEnum.Admin) !== -1;

  const methods = useForm<UserCreateInput>({
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
      type: hasAdmin ? UserTypeEnum.User : UserTypeEnum.Admin,
    },
    resolver,
  });

  const onSubmit = (values: UserCreateInput) => {
    try {
      if (users.find((user) => user.email === values.email)) {
        throw new Error("This email registered! Use other email!");
      }
      const _user = realm.user!.write(() => realm.user?.create("User", values));
      const user = _user as unknown as User;
      realm.category!.write(() => {
        createCategories(`${user._id}`).map((cat) =>
          realm.category?.create("Category", cat),
        );
      });
      realm.wallet!.write(() => {
        realm.wallet?.create("Wallet", {
          date: startOfMonth(new Date()),
          userId: `${user._id}`,
        } as WalletCreateInput);
      });
      methods.reset();

      navigate(SIGN_IN_SCREEN_ROUTE);
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <DefaultLayout className="justify-center">
      <DefaultScrollView>
        <FormProvider {...methods}>
          <StyledView className="flex flex-col" style={{ gap: 32 }}>
            <StyledView className="flex justify-center items-center gap-1 mt-3">
              <StyledText className="text-xl">
                Welcome to the Expense Tracker App!
              </StyledText>
            </StyledView>
            <StyledView>
              <RoleSelectInput name="type" disabled={false} />
              <StyledView className="flex flex-1 items-center flex-row gap-2 mt-1 text-neutral-500">
                <InfoIcon size={16} />
                <StyledText className="text-sm">
                  Each device only can have one Admin
                </StyledText>
              </StyledView>
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
            <RateSelectInput
              name="defaultBaseRate"
              placeholder="Select your Base Rate"
            />

            <SubmitButton onSubmit={onSubmit} fill>
              Sign Up
            </SubmitButton>
            <StyledView className="flex flex-row gap-1">
              <StyledText className="text-base">
                Already have an account?
              </StyledText>
              <StyledText
                className="text-base text-blue-700 font-semibold"
                onPress={() => navigate(SIGN_IN_SCREEN_ROUTE)}
              >
                Sign In
              </StyledText>
            </StyledView>
          </StyledView>
        </FormProvider>
      </DefaultScrollView>
    </DefaultLayout>
  );
}
