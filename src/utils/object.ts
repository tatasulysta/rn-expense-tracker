export const isEmpty = (val: object) =>
  Object.keys(val).length === 0 && val.constructor === Object;
