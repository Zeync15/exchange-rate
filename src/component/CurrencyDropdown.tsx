import type { FC } from "react";
import { CurrencyDropList } from "../mock/exchangeRate";
import type { CurrencyRes } from "../api/exchangeRate";

interface CurrencyDropdownProps {
  selectedCurrency: CurrencyRes;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CurrencyDropdown: FC<CurrencyDropdownProps> = ({
  selectedCurrency,
  onChange,
}) => {
  return (
    <div className="w-fit rounded-2xl border border-gray-300 !cursor-pointer p-2">
      <select
        className="border-none focus:outline-none focus:ring-0"
        value={selectedCurrency.currencyCode}
        onChange={onChange}
      >
        <option value="">Select Currency</option>
        {CurrencyDropList.map(({ currencyCode, currencyDesc }) => (
          <option key={currencyCode} value={currencyCode}>
            {currencyCode}: {currencyDesc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
