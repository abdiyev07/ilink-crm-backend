const oneMinute = 60000;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;

export const addYearToDate = (date: Date, addingYears: number): Date => {
  const years = date.getFullYear() + addingYears;
  date.setFullYear(years);
  return date;
};

export const formatDate = (date: Date, showTime = false): string => {
  if (!date) return 'Неизвестная дата';
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  if (showTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }

  try {
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  } catch (e) {
    return 'Неизвестная дата';
  }
};

export const isDatesDifferenceMoreThanMonth = (fromDate: Date, toDate: Date): boolean => {
  const difference = toDate.valueOf() - fromDate.valueOf();
  const monthMilliSeconds = 31 * oneDay;
  return monthMilliSeconds >= difference;
};

export const isDateLowerThanNow = (date: Date): boolean => {
  return date.valueOf() <= Date.now();
};
