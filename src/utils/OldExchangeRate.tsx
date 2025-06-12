import { FC } from 'react';
import { exchangeRateRes } from 'src/types/common';
import { formatNumberWithCommas } from '..';

interface ExchangeRateProps {
  balance: string;
  selectedCurrency: string;
  baseCurrency: string;
  rowCurrency: string;
  exchangeRate: exchangeRateRes | undefined;
  buyRate?: number;
  conversionUnit?: number;
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
  // convert 140,457,123.09 -> 140457123.09
  const parseValue = (balance: string) => parseFloat(balance.replace(/,/g, ''));

  const roundToTwoDecimals = (balance: number) =>
    Math.round((balance + Number.EPSILON) * 100) / 100;

  function roundHalfUp(value: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round((value * factor) / factor);
  }
  // Scenario 1, Foreign Currency to Base Currency, (Balance *ConversionUnit  /buyRate )
  const foreignToBase = (
    balance: string,
    buyRate: number,
    conversionUnit: number
  ) => {
    const num = parseValue(balance);
    return roundToTwoDecimals((num * conversionUnit!) / buyRate!).toString();
  };

  // Scenario 2, Base Currency to Foreign Currency, (Balance * buyRate / ConversionUnit)
  const baseToForeign = (
    balance: string,
    buyRate: number,
    conversionUnit: number
  ) => {
    const num = parseValue(balance);
    const roundedHalfUpValue = roundHalfUp(
      (num * buyRate!) / conversionUnit!,
      2
    )
      .toFixed(2)
      .toString();
    return roundedHalfUpValue;
  };

  // Scenario 3, Foreign Currency to Foreign Curreny, 2 way conversion, call Scenario 1, then Scenario 2
  //   Example USD -> MYR -> AUD
  //   buyRate1 and conversionUnit1 is for converting from USD to MYR, buyRate2 and conversionUnit2 is for converting from MYR to AUD
  const foreignToForeign = (
    balance: string,
    buyRate1: number,
    conversionUnit1: number,
    buyRate2: number,
    conversionUnit2: number
  ) => {
    const num = parseValue(balance);
    const step1 = (num * conversionUnit1!) / buyRate1!;
    const step2 = (step1 * buyRate2!) / conversionUnit2!;
    return roundHalfUp(step2, 2).toFixed(2).toString();
  };

  const getConvertedValue = () => {
    // If user did not change the currency, it returns balance without any conversion.
    if (selectedCurrency === 'Default') {
      return balance;
    }
    // User change the currency
    // If the current row's currency equal to selected currency, it returns balance without any conversion.
    if (rowCurrency === selectedCurrency) {
      return balance;
    }
    // If the current row's currency equal to base currency, convert base currency to selected currency
    if (rowCurrency === baseCurrency) {
      if (
        exchangeRate?.buyRate !== undefined &&
        exchangeRate?.conversionUnit !== undefined
      ) {
        return baseToForeign(
          balance,
          exchangeRate?.buyRate,
          exchangeRate?.conversionUnit
        );
      } else {
        return 'Conversion unavailable';
      }
    }
    // If the selected currency equal to base currency, convert current row's currency to base currency
    if (selectedCurrency === baseCurrency) {
      if (buyRate !== undefined && conversionUnit !== undefined) {
        return foreignToBase(balance, buyRate, conversionUnit);
      } else {
        return 'Conversion unavailable';
      }
    }
    // If the current row's currency not equal to base currency nor selected currency, convert current row's currency to base currency, then convert base currency to selected current (2 way conversion)
    if (
      buyRate !== undefined &&
      conversionUnit !== undefined &&
      exchangeRate?.buyRate !== undefined &&
      exchangeRate?.conversionUnit !== undefined
    ) {
      return foreignToForeign(
        balance,
        buyRate,
        conversionUnit,
        exchangeRate.buyRate,
        exchangeRate.conversionUnit
      );
    } else {
      return 'Conversion unavailable';
    }
  };

  const value = getConvertedValue();

  //   it returns purely the value, pls do not add any styling
  return <div>{formatNumberWithCommas(value)}</div>;
};

export default ExchangeRate;