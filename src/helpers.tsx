export const padStart = (len: number, symbol: string, str: string) => {
  let needs = len - str.length;
  if (needs < 1) {
    return str;
  }
  let result = str;
  for (let index = 0; index < needs; index++) {
    result = symbol + result;
  }
  return result;
};

export const getTimeFromDate = (date: Date) => {
  const hours = padStart(2, "0", date.getHours().toString());
  const mins = padStart(2, "0", date.getMinutes().toString());
  return `${hours}:${mins}`;
};

export const getTimeFromAndTo = (from: string, duration: number) => {
  const dateFrom = new Date(from);
  const dateTo = new Date(dateFrom.getTime() + duration * 60000);
  return `${getTimeFromDate(dateFrom)} - ${getTimeFromDate(dateTo)}`;
};

export const getTimeFromMins = (mins: number) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + "ч. " + minutes + "м.";
};
