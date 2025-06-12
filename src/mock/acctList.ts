import type { AcctListRes } from "../api/acctList";

export const AcctList: AcctListRes = {
  totalPages: 1,
  currentPage: 1,
  nextPage: 1,
  totalRecordCount: 2,
  data: [
    {
      acctName: "Account 1",
      acctNumber: "123412341234",
      currency: "MYR",
      ledgerBalance: "2,612.92",
      availableBalance: "1,306.46",
      provider: "MY",
    },
    {
      acctName: "Account 2",
      acctNumber: "456745674567",
      currency: "SGD",
      ledgerBalance: "571,193,234.54",
      availableBalance: "354,123,789.12",
      provider: "SG",
    },
    {
      acctName: "Account 3",
      acctNumber: "789078907890",
      currency: "USD",
      ledgerBalance: "222,896.46",
      availableBalance: "787.00",
      provider: "US",
    },
  ],
};
