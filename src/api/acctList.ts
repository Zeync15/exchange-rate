export interface AcctListRes {
  totalPages: number;
  currentPage: number;
  nextPage: number;
  totalRecordCount: number;
  data: AcctListItem[];
}

export interface AcctListItem {
  acctName: string;
  acctNumber: string;
  currency: string;
  ledgerBalance: string;
  availableBalance: string;
  provider: string;
}

export interface CompanyListItem {
  companyName: string;
  numberOfCompany: number;
}