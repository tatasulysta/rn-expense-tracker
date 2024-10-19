export const resetTime = (date: Date) => {
  const temp = date;
  temp.setHours(0, 0, 0, 0);
  return temp;
};
