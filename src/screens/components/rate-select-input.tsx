import React from "react";
import { useGetRates } from "../../api-hook/rate";
import Input from "../../components/elements/field";
import { ActivityIndicator } from "react-native";
import { MoneyIcon } from "../../assets";

interface Props {
  name: string;
  baseRate?: string;
  placeholder?: string;
}

export default function RateSelectInput(props: Props) {
  const { name, baseRate = "IDR", placeholder } = props;
  const { data, error, loading } = useGetRates(baseRate);

  return (
    <Input
      name={name}
      type="select"
      options={Object.keys(data?.conversion_rates || {}).map((key) => ({
        label: key,
        value: key,
      }))}
      placeholder={placeholder}
      leftSection={<MoneyIcon size={24} />}
      rightSection={loading && <ActivityIndicator color="black" />}
    />
  );
}
