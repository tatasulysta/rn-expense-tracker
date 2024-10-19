import React from "react";
import { useGetRates } from "../../api-hook/rate";
import Input from "../../components/elements/field";
import { ActivityIndicator } from "react-native";
import { MoneyIcon } from "../../assets";

interface Props {
  name: string;
  baseRate?: string;
  placeholder?: string;
  onAfterChange?: (value: number) => void;
  label?: string;
}

export default function RateSelectInput(props: Props) {
  const { name, baseRate = "IDR", placeholder, onAfterChange, label } = props;
  const { data, loading } = useGetRates(baseRate);

  const conversionRates = data?.conversion_rates || {};
  return (
    <Input
      name={name}
      label={label}
      type="select"
      options={Object.keys(conversionRates).map((key) => ({
        label: key,
        value: key,
      }))}
      onAfterChange={(key) => onAfterChange?.(conversionRates[key])}
      placeholder={placeholder}
      leftSection={<MoneyIcon size={24} />}
      rightSection={loading && <ActivityIndicator color="black" />}
    />
  );
}
