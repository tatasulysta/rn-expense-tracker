import Button from "../../../../components/elements/button";

export default function Badge(props: {
  value: string;
  state: string;
  onPress: () => void;
  children: React.ReactNode;
}) {
  const { children, onPress, state, value } = props;
  return (
    <Button
      onPress={onPress}
      className="border-1 rounded-full items-center p-2 flex-grow-0 self-start"
      variant={value === state ? "default" : "outlined"}
      size="small"
      fill={false}
    >
      {children}
    </Button>
  );
}
