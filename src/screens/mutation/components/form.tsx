import React from "react";
import {
  Mutation,
  MutationCreateInput,
  MutationType,
  UserTypeEnum,
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
import { InfoIcon } from "../../../assets";
import SubmitButton from "../../../components/elements/submit-button";
import TextInfo from "../../../components/common/text-info";

interface Props {
  mutation?: Mutation;
}

type FormType = Omit<MutationCreateInput, "userId" | "rate" | "rateFrom"> & {
  rate?: number;
};

const validation = (isAdmin) =>
  yupResolver<Omit<FormType, "categoryId">>(
    Yup.object({
      type: Yup.string()
        .required()
        .oneOf([MutationType.Expense, MutationType.Income]),
      transactionAt: Yup.date().required(),
      categoryId: Yup.string().required(),
      description: Yup.string(),
      rateTo: Yup.string().required(),
      amount: Yup.number().required(),
      rate: Yup.number(),
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
  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      categoryId: "",
      description: "",
      rateTo: baseRate,
      transactionAt: new Date(),
      type: MutationType.Income,
    },
    resolver: validation(isAdmin) as any,
  });

  const onSubmit = async (values: FormType) => {
    try {
      await Yup.object({ categoryId: Yup.string().required() }).validate(
        values,
      );
      console.log(values);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DefaultLayout
      header={<Header title={`${mutation ? "Edit" : "New"} Mutation`} />}
    >
      <StyledView
        style={{
          display: "flex",
          gap: 20,
          flexDirection: "column",
        }}
        className="mt-5"
      >
        <FormProvider {...methods}>
          <Input type="date" name="transactionAt" label="Transaction At" />
          <Input
            type="select"
            name="type"
            options={typeSelectOptions}
            label="Mutation Type"
          />
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
              label="Rate"
            />
            <TextInfo>Your Base Rate is {baseRate!}</TextInfo>
          </StyledView>

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
          <SubmitButton onSubmit={onSubmit} fill>
            Save
          </SubmitButton>
        </FormProvider>
      </StyledView>
    </DefaultLayout>
  );
}
