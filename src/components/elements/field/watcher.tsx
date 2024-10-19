import React from "react";
import { useWatch } from "react-hook-form";
interface Props {
  name: string[];
  children: (values: any[]) => React.ReactNode;
}
export default function FieldWatcher(props: Props) {
  const values = useWatch({ name: props.name });
  console.log(values);
  return props.children(values);
}
