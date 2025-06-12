import type { AcctListItem } from "../api/acctList";
import { AcctList } from "../mock/acctList";
import { formatAcctNumber } from "../utils";
import type { ColumnDef } from "@tanstack/react-table";
import { Table } from "../component/Table";
import type { CurrencyRes } from "../api/exchangeRate";
import ExchangeRate from "../utils/ExchangeRate";
import { CurrencyDropList, getExchangeRate } from "../mock/exchangeRate";
import CurrencyDropdown from "../component/CurrencyDropdown";
import { useState } from "react";

const AcctListing = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyRes>({
    currencyCode: "",
    currencyDesc: "",
    countryName: "",
    decimalNo: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;

    const selected = CurrencyDropList.find(
      (item) => item.currencyCode === selectedCode
    );

    if (selected) {
      setSelectedCurrency(selected);
    } else {
      setSelectedCurrency({
        currencyCode: "",
        currencyDesc: "",
        countryName: "",
        decimalNo: 0,
      });
    }
  };

  const hasSelectedCurrency =
    selectedCurrency.currencyCode !== "" && selectedCurrency.currencyCode;

  const columns: ColumnDef<AcctListItem>[] = [
    {
      accessorKey: "acctName",
      header: "Account Name",
      cell: ({ row }) => <div className="">{row.original.acctName}</div>,
    },
    {
      accessorKey: "acctNumber",
      header: "Account No.",
      cell: ({ row }) => (
        <div className="">{formatAcctNumber(row.original.acctNumber)}</div>
      ),
    },
    {
      accessorKey: "currency",
      header: "Currency",
      cell: ({ row }) => <div className="">{row.original.currency}</div>,
    },
    {
      accessorKey: "ledgerBalance",
      header: () => <div className="text-right">Balance 1</div>,
      cell: ({ row }) => {
        const { ledgerBalance, currency: rowCurrency } = row.original;

        const buyRate = getExchangeRate.find(
          (currency) => currency.currency === rowCurrency
        )?.buyRate;

        const conversionUnit = getExchangeRate.find(
          (currency) => currency.currency === rowCurrency
        )?.conversionUnit;

        return (
          <div className="flex justify-end gap-4">
            <ExchangeRate
              balance={ledgerBalance}
              selectedCurrency={selectedCurrency.currencyCode}
              baseCurrency={"MYR"}
              rowCurrency={rowCurrency}
              exchangeRate={
                (selectedCurrency.currencyCode !== ""
                  ? getExchangeRate.find(
                      (currency) =>
                        currency.currency === selectedCurrency.currencyCode
                    )
                  : getExchangeRate.find(
                      (currency) => currency.currency === rowCurrency
                    ))!
              }
              buyRate={buyRate!}
              conversionUnit={conversionUnit!}
            />
            {hasSelectedCurrency}
          </div>
        );
      },
    },
    {
      accessorKey: "availableBalance",
      header: () => <div className="text-right">Balance 2</div>,
      cell: ({ row }) => (
        <div className="text-right ">{row.original.availableBalance}</div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-end mb-5">
        <CurrencyDropdown
          selectedCurrency={selectedCurrency}
          onChange={handleChange}
        />
      </div>
      Provider: MY
      <Table data={AcctList.data} columns={columns} />
    </div>
  );
};

export default AcctListing;
