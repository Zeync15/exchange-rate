import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { AcctListItem } from "../api/acctList";
import type { CurrencyRes } from "../api/exchangeRate";
import Accordion from "../component/Accordion";
import CompanyDropdown from "../component/CompanyDropdown";
import CurrencyDropdown from "../component/CurrencyDropdown";
import SearchBar from "../component/SearchBar";
import { Table } from "../component/Table";
import { AcctList } from "../mock/acctList";
import { CompanyList } from "../mock/companyList";
import { CurrencyDropList, getExchangeRate } from "../mock/exchangeRate";
import { formatAcctNumber } from "../utils";
import ExchangeRate from "../utils/ExchangeRate";

const AcctListing = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyRes>({
    currencyCode: "",
    currencyDesc: "",
    countryName: "",
    decimalNo: 0,
  });

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const [tableData, setTableData] = useState<AcctListItem[]>([]);

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
              balance={ledgerBalance ?? "-"}
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
        <div className="text-right ">
          {row.original.availableBalance ?? "-"}
        </div>
      ),
    },
  ];

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "All Companies") {
      setSelectedCompany(null);
    } else {
      setSelectedCompany(selectedOption);
    }
  };

  useEffect(() => {
    // Initialize with full data on component mount
    setTableData(AcctList.data);
  }, []);

  const handleSearch = (searchTerm: string) => {
    setTableData(
      searchTerm.length === 0
        ? AcctList.data
        : AcctList.data.filter((d) =>
            d.acctName.toLowerCase().includes(searchTerm.toLowerCase())
          )
    );
  };

  return (
    <div className="">
      <CompanyDropdown options={CompanyList} onSelect={handleSelect} />

      <div className="flex justify-between mb-5">
        <SearchBar onChange={handleSearch} />
        <CurrencyDropdown
          selectedCurrency={selectedCurrency}
          onChange={handleChange}
        />
      </div>

      {selectedCompany === null ? (
        <Accordion
          CompanyList={CompanyList}
          children={<Table data={tableData} columns={columns} />}
        />
      ) : (
        <Table data={tableData} columns={columns} />
      )}
    </div>
  );
};

export default AcctListing;
