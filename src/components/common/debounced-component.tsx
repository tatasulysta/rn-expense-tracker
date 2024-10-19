import React from "react";
import { debounce } from "../../utils/debounce";
interface Props<T> {
  setValue: React.Dispatch<T>;
  value: T;
  children: (value: T, onAfterChange: (value: T) => void) => React.ReactNode;
}
export default function DebouncedComponent<T>(props: Props<T>) {
  const [value, setValue] = React.useState<T>(props.value);

  const onAfterChange = debounce(() => props.setValue(value));

  return (
    <>
      {props.children(value, (value) => {
        setValue(value);
        onAfterChange(value);
      })}
    </>
  );
}
