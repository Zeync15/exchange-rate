export interface CurrencyRes {
  currencyCode: string;
  currencyDesc: string;
  countryName: string;
  decimalNo: number;
}

export interface ExchangeRateRes {
  baseCurrency: string;
  currency: string;
  conversionUnit: number;
  buyRate: number;
  revalRate: number;
  sellRate: number;
}
