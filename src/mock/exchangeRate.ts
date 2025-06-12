import type { CurrencyRes, ExchangeRateRes } from "../api/exchangeRate";

export const CurrencyDropList: CurrencyRes[] = [
  {
    currencyCode: "MYR",
    currencyDesc: "Ringgit Malaysia",
    countryName: "Malaysia",
    decimalNo: 2,
  },
  {
    currencyCode: "SGD",
    currencyDesc: "Singapore Dollar",
    countryName: "Singapore",
    decimalNo: 2,
  },
  {
    currencyCode: "USD",
    currencyDesc: "UNITED STATES DOLLAR",
    countryName: "United State of America",
    decimalNo: 2,
  },
  {
    currencyCode: "JPY",
    currencyDesc: "Japanese Yen",
    countryName: "Japan",
    decimalNo: 4,
  },
];

export const getExchangeRate: ExchangeRateRes[] = [
  {
    baseCurrency: "MYR",
    currency: "MYR",
    conversionUnit: 1,
    buyRate: 1,
    revalRate: 1,
    sellRate: 1,
  },
  {
    baseCurrency: "MYR",
    currency: "SGD",
    conversionUnit: 1,
    buyRate: 3.051,
    revalRate: 3.0907,
    sellRate: 3.152,
  },
  {
    baseCurrency: "MYR",
    currency: "USD",
    conversionUnit: 1,
    buyRate: 4.077,
    revalRate: 4.1063,
    sellRate: 4.202,
  },
  {
    baseCurrency: "MYR",
    currency: "JPY",
    conversionUnit: 100,
    buyRate: 3.74,
    revalRate: 3.88,
    sellRate: 3.686,
  },
];
