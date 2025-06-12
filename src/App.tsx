import AcctListing from "./page/AcctListing";
import { getExchangeRate } from "./mock/exchangeRate";

const App = () => {
  return (
    <div className="max-w-[800px] mx-auto mt-20">
      <AcctListing />

      <pre>{JSON.stringify(getExchangeRate, null, 2)}</pre>
    </div>
  );
};

export default App;
