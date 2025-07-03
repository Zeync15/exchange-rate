import { getExchangeRate } from "../mock/exchangeRate";

const ExchangeRate = () => {
  return (
    <div className="my-4">
      Calculation
      <ol>
        <li>if balance is somehow null, return "-"</li>
        <br />
        <li>if user didnt change currency, display the original currency</li>
        <br />
        <li>user change currency</li>
        <li>
          If the current row's currency equal to selected currency, it returns
          balance without any conversion.
        </li>
        <br />

        <li>
          If the current row's currency equal to base currency, convert base
          currency to selected currency (baseToForeign())
        </li>
        <br />

        <li>
          If the selected currency equal to base currency, convert current row's
          currency to base currency (foreignToBase())
        </li>
        <br />

        <li>
          If the current row's currency not equal to base currency nor selected
          currency, convert current row's currency to base currency, then
          convert base currency to selected currency (2 way conversion,
          foreignToForeign())
        </li>
        <br />

        <li>formula</li>
        <li>Scenario 1: foreign currency to base currency</li>
        <li> balance * buyRate / conversionUnit</li>
        <br />
        <li>Scenario 2: foreign currency to base currency</li>
        <li> balance / conversionUnit * buyRate</li>
        <br />
        <li>Scenario 3: foreign currency to foreign currency</li>
        <li>step1 = balance * buyRate1 / conversionUnit1 </li>
        <li>step2 = step1 * conversionUnit2 / buyRate2 </li>
      </ol>
      <div className="mt-12">
        Exchange Rate
        <pre>{JSON.stringify(getExchangeRate, null, 2)}</pre>
      </div>
    </div>
  );
};
export default ExchangeRate;
