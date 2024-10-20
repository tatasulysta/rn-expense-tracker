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
import UserSelectInput from "../../components/user-select-input";
import { toast } from "../../../utils/notification";

interface Props {
  id?: string;
}

type FormType = Omit<MutationCreateInput, "userId" | "rate" | "rateFrom"> & {
  rate?: number;
  userId?: string;
};

const validation = () =>
  yupResolver<Omit<FormType, "categoryName" | "userId">>(
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
  const { id } = props;
  const { navigate } = useNavigation();
  const { credential } = useCredential();
  const realm = useRealm();
  const mutation = id
    ? realm.mutation!.objectForPrimaryKey("Mutation", props.id)
    : undefined;
  const _mutation = mutation as unknown as Mutation | undefined;
  const baseRate = credential?.user?.defaultBaseRate;
  const isAdmin = credential?.user?.type === UserTypeEnum.Admin;

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      categoryId: _mutation?.categoryId || "",
      description: _mutation?.description || "",
      rateTo: _mutation?.rateTo || baseRate,
      transactionAt: _mutation?.transactionAt || new Date(),
      type: (_mutation?.type as any) || MutationType.Income,
      rate: _mutation?.rate || 1,
      amount: _mutation?.amount || 0,
      categoryName: _mutation?.categoryName || "",
      userId: `${credential?.user?._id}`,
    },
    resolver: validation() as any,
  });

  const onSubmit = async (values: FormType) => {
    try {
      if (!id && isAdmin) {
        await Yup.object({ userId: Yup.string().required() }).validate(values);
      }

      const transactionAt = startOfMonth(resetTime(values.transactionAt));
      const amount = Number(values.amount) || 0;
      const isIncome = values.type === MutationType.Income;

      realm.wallet!.write(() => {
        const walletToEdit = realm.wallet
          ?.objects("Wallet")
          .filtered(
            "userId==$0 && date==$1",
            values.userId,
            transactionAt,
          )[0] as unknown as Wallet;

        if (!walletToEdit) {
          realm.wallet?.create("Wallet", {
            date: transactionAt,
            userId: values.userId,
            ...(isIncome ? { income: amount } : { expense: amount }),
          } as WalletCreateInput);
        } else {
          const before = {
            income:
              (_mutation?.type === MutationType.Income
                ? _mutation?.amount
                : 0) || 0,
            expense:
              (_mutation?.type === MutationType.Expense
                ? _mutation?.amount
                : 0) || 0,
          };
          if (isIncome) {
            walletToEdit.income =
              (walletToEdit.income || 0) - before.income + amount;
            walletToEdit.expense = (walletToEdit.expense || 0) - before.expense;
          } else {
            walletToEdit.income = (walletToEdit.income || 0) - before.income;
            walletToEdit.expense = (walletToEdit.expense || 0) + amount;
          }
        }
      });
      if (id) {
        realm.mutation?.write(() => {
          const mutationToEdit = realm.mutation!.objectForPrimaryKey(
            "Mutation",
            id,
          );
          if (mutationToEdit) {
            mutationToEdit.amount = values.amount;
            mutationToEdit.categoryId = values.categoryId;
            mutationToEdit.description = values.description;
            mutationToEdit.categoryName = values.categoryName;
            mutationToEdit.rate = values.rate;
            mutationToEdit.rateTo = values.rateTo;
          }
        });
      } else {
        realm.mutation!.write(() => {
          realm.mutation?.create("Mutation", {
            ...values,
            amount: Number(values.amount) * (values.rate || 0),
            rateFrom: credential?.user?.defaultBaseRate!,
          } as MutationCreateInput);
        });
      }
      navigate(HOME_SCREEN_ROUTE);
    } catch (e: any) {
      toast.error(e?.message);
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
        >
          {isAdmin && !id && (
            <StyledView>
              <UserSelectInput name="userId" excludeAdmin />
            </StyledView>
          )}
          <Input
            type="select"
            name="type"
            options={typeSelectOptions}
            label="Mutation Type"
          />
          <FieldWatcher name={["userId"]}>
            {([uid]) => (
              <CategorySelectInput
                userId={uid}
                name="categoryId"
                label="Category"
                onAfterChange={(value) =>
                  methods.setValue("categoryName", value)
                }
              />
            )}
          </FieldWatcher>
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
