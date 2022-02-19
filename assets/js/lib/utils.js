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

export const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
