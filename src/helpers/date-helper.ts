export const convertDateToUnixTimestamp = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};

export const convertUnixTimestampToDate = (unixTimestamp: number) => {
  const milliseconds = unixTimestamp * 1000;

  return new Date(milliseconds).toLocaleDateString();
};

interface CreateDateArguments {
  date: Date;
  days: number;
  weeks: number;
  months: number;
  years: number;
}

export const createDate = ({
  date,
  days,
  weeks,
  months,
  years,
}: CreateDateArguments): Date => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setDate(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};
