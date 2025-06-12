export const formatNumberWithCommas = (value: string | undefined) => {
  if (value === undefined) {
    return;
  }

  const number = parseFloat(value);

  if (isNaN(number)) return "-";

  if (value.includes(",")) return value;

  const formattedNumber = parseFloat(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedNumber;
};

export const formatAcctNumber = (num: string) => {
  return num
    .replace(/\s+/g, "") // remove existing spaces
    .replace(/(\d{4})(?=\d)/g, "$1 ");
};
