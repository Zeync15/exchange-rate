export interface AcctListRes {
  totalPages: number;
  currentPage: number;
  nextPage: number;
  totalRecordCount: number;
  corpId: number
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
  corpId: number;
  companyName: string;
  numberOfCompany: number;
}