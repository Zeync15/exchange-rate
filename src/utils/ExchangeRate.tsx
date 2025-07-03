import type { FC } from "react";
import { formatNumberWithCommas } from ".";
import type { ExchangeRateRes } from "../api/exchangeRate";

interface ExchangeRateProps {
  balance: string;
  selectedCurrency: string;
  baseCurrency: string;
  rowCurrency: string;
  exchangeRate: ExchangeRateRes;
  buyRate: number;
  conversionUnit: number;
}

const ExchangeRate: FC<ExchangeRateProps> = ({
  balance,
  selectedCurrency,
  baseCurrency,
  rowCurrency,
  exchangeRate,
  buyRate,
  conversionUnit,
}) => {
  // Remove commas from balance string and convert to number,
  //  140,457,123.09 -> 140457123.09
  const parseValue = (balance: string): number =>
    parseFloat(balance.replace(/,/g, ""));

  // Round to 2 decimal places
  const roundToTwoDecimals = (balance: number) =>
    Math.round((balance + Number.EPSILON) * 100) / 100;

  // Scenario 1: Foreign Currency to Base Currency (Balance * buyRate / conversionUnit)
  const foreignToBase = (
    balance: string,
    buyRate: number,
    conversionUnit: number
  ): string => {
    const num = parseValue(balance);
    return roundToTwoDecimals((num * buyRate) / conversionUnit).toString();
  };

  // Scenario 2: Base Currency to Foreign Currency (Balance * conversionUnit / buyRate)
  const baseToForeign = (
    balance: string,
    buyRate: number,
    conversionUnit: number
  ) => {
    const num = parseValue(balance);
    return roundToTwoDecimals((num * conversionUnit) / buyRate).toString();
  };

  // Scenario 3: Foreign Currency to Foreign Currency (2-way conversion)
  // call Scenario 1, then Scenario 2
  // Example USD -> MYR -> SGD
  // buyRate1 and conversionUnit1 is for converting from USD to MYR, buyRate2 and conversionUnit2 is for converting from MYR to SGD
  const foreignToForeign = (
    balance: string,
    buyRate1: number,
    conversionUnit1: number,
    buyRate2: number,
    conversionUnit2: number
  ) => {
    const num = parseValue(balance);
    const step1 = (num * buyRate1) / conversionUnit1;
    const step2 = (step1 * conversionUnit2) / buyRate2;
    return roundToTwoDecimals(step2).toString();
  };

  const getConvertedValue = (): string | undefined => {
    // If user did not change the currency, it returns balance without any conversion.
    if (selectedCurrency === "Default") {
      return balance;
    }

    // User change the currency
    // If the current row's currency equal to selected currency, it returns balance without any conversion.
    if (rowCurrency === selectedCurrency) {
      return balance;
    }

    // If the current row's currency equal to base currency, convert base currency to selected currency
    if (rowCurrency === baseCurrency) {
      return baseToForeign(
        balance,
        exchangeRate?.buyRate,
        exchangeRate?.conversionUnit
      );
    }

    // If the selected currency equal to base currency, convert current row's currency to base currency
    if (selectedCurrency === baseCurrency) {
      return foreignToBase(balance, buyRate, conversionUnit);
    }

    // If the current row's currency not equal to base currency nor selected currency, convert current row's currency to base currency, then convert base currency to selected currency (2 way conversion)
    return foreignToForeign(
      balance,
      buyRate,
      conversionUnit,
      exchangeRate.buyRate,
      exchangeRate.conversionUnit
    );
  };

  const value = getConvertedValue();

  //   it returns purely the value, pls do not add any styling
  return <div>{formatNumberWithCommas(value)}</div>;
};

export default ExchangeRate;
