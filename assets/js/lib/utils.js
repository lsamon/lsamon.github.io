const makePercentWholeNumber = (decimalValue) => {
  return decimalValue * 100;
}

export const formattedNumber = (number) => {
  number = number.toString();
  return number.split(/(?=(?:\d{3})+$)/).join(",");
}

export const formatPercentage = (percentWholeNumber) => {
  return `${makePercentWholeNumber(percentWholeNumber)}%`;
}

export const even = (id) => {
  return id % 2 == 0;
}
