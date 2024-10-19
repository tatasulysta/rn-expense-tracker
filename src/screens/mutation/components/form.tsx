import React from "react";
import {
  Mutation,
  MutationCreateInput,
  MutationType,
  UserTypeEnum,
  Wallet,
  WalletCreateInput,
} from "../../../store/auth.schema";
import * as Yup from "yup";
import { useNavigation } from "../../../hooks/use-navigation";
import { useRealm } from "../../../hooks/use-realm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCredential } from "../../../hooks/use-credential";
import { FormProvider, useForm } from "react-hook-form";
import DefaultLayout from "../../../components/layout/default-layout";
import DefaultScrollView from "../../../components/common/scroll-view";
import { StyledText, StyledView } from "../../../components/common";
import Header from "../../../components/widgets/header";
import Input from "../../../components/elements/field";
import { SelectInputOption } from "../../../components/elements/input/select-input";
import RateSelectInput from "../../components/rate-select-input";
import FieldWatcher from "../../../components/elements/field/watcher";
import { string2money } from "../../../utils/string";
import SubmitButton from "../../../components/elements/submit-button";
import TextInfo from "../../../components/common/text-info";
import { startOfMonth } from "date-fns";
import { HOME_SCREEN_ROUTE } from "../../../../router-type";
import CategorySelectInput from "../../components/category-select-input";
import { resetTime } from "../../../utils/date";

interface Props {
  mutation?: Mutation;
}

type FormType = Omit<MutationCreateInput, "userId" | "rate" | "rateFrom"> & {
  rate?: number;
};

const validation = (isAdmin) =>
  yupResolver<Omit<FormType, "categoryName">>(
    Yup.object({
      type: Yup.string()
        .required()
        .oneOf([MutationType.Expense, MutationType.Income]),
      transactionAt: Yup.date().required(),
      description: Yup.string(),
      rateTo: Yup.string().required(),
      amount: Yup.number().required(),
      rate: Yup.number(),
      categoryId: Yup.string().required(),
    }),
  );

const typeSelectOptions: SelectInputOption[] = [
  {
    label: MutationType.Expense,
    value: MutationType.Expense,
  },
  {
    label: MutationType.Income,
    value: MutationType.Income,
  },
];

export default function MutationForm(props: Props) {
  const { mutation } = props;
  const { navigate } = useNavigation();
  const { credential } = useCredential();
  const realm = useRealm();
  const baseRate = credential?.user?.defaultBaseRate;
  const isAdmin = credential?.user?.type === UserTypeEnum.Admin;
  const uid = `${credential?.user?._id}`;

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      categoryId: "",
      description: "",
      rateTo: baseRate,
      transactionAt: new Date(),
      type: MutationType.Income,
      rate: 1,
    },
    resolver: validation(isAdmin) as any,
  });

  const onSubmit = async (values: FormType) => {
    try {
      await Yup.object({ categoryId: Yup.string().required() }).validate(
        values,
      );
      realm.mutation!.write(() => {
        realm.mutation?.create("Mutation", {
          ...values,
          amount: Number(values.amount) * (values.rate || 0),
          rateFrom: credential?.user?.defaultBaseRate!,
          userId: `${credential?.user?._id}`,
        } as MutationCreateInput);
      });
      const transactionAt = startOfMonth(resetTime(values.transactionAt));
      const amount = Number(values.amount) || 0;
      const isIncome = values.type === MutationType.Income;
      realm.wallet!.write(() => {
        const walletToEdit = realm.wallet
          ?.objects("Wallet")
          .filtered(
            "userId==$0 && date==$1",
            uid,
            transactionAt,
          )[0] as unknown as Wallet;
        if (!walletToEdit) {
          realm.wallet?.create("Wallet", {
            date: transactionAt,
            userId: uid,
            ...(isIncome ? { income: amount } : { expense: amount }),
          } as WalletCreateInput);
        } else {
          if (isIncome)
            walletToEdit.income = (walletToEdit.income || 0) + amount;
          else walletToEdit.expense = (walletToEdit.expense || 0) + amount;
        }
        navigate(HOME_SCREEN_ROUTE);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <DefaultLayout
        header={<Header title={`${mutation ? "Edit" : "New"} Mutation`} />}
      >
        <DefaultScrollView
          contentContainerStyle={{
            gap: 20,
          }}
          className="mt-5"
        >
          <Input
            type="select"
            name="type"
            options={typeSelectOptions}
            label="Mutation Type"
          />
          <CategorySelectInput
            userId={uid}
            name="categoryId"
            label="Category"
            onAfterChange={(value) => methods.setValue("categoryName", value)}
          />
          <Input type="date" name="transactionAt" label="Transaction At" />
          <Input
            type="number"
            name="amount"
            label="Amount"
            placeholder="Enter Amount"
          />
          <StyledView>
            <RateSelectInput
              name="rateTo"
              baseRate={baseRate}
              onAfterChange={(value) => methods.setValue("rate", value)}
              label="Transaction Rate"
            />
            <TextInfo withIndent>Your Base Rate is {baseRate!}</TextInfo>
          </StyledView>
          <Input
            type="text"
            name="description"
            label="Note"
            placeholder="Enter Note"
          />
          <FieldWatcher name={["rate", "rateTo", "amount", "type"]}>
            {([rate, rateTo, amount, type]) => (
              <StyledView className="flex flex-col gap-y-0">
                <StyledView className="flex flex-row items-center justify-between">
                  <StyledText className="font-medium text-lg">Total</StyledText>
                  <StyledText
                    className={`${
                      type === MutationType.Expense
                        ? "text-red-500"
                        : "text-green-500"
                    } text-base font-medium`}
                  >
                    {string2money((rate || 0) * (amount || 0))}
                  </StyledText>
                </StyledView>
                <TextInfo>{`${rateTo} -> ${baseRate}`}</TextInfo>
              </StyledView>
            )}
          </FieldWatcher>
          <StyledView>
            <SubmitButton onSubmit={onSubmit}>Save</SubmitButton>
          </StyledView>
        </DefaultScrollView>
      </DefaultLayout>
    </FormProvider>
  );
}
