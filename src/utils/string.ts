import numeral from "numeral";

export function string2money(value: string | number): string {
  return numeral(`${value}`).format("0,0");
}
