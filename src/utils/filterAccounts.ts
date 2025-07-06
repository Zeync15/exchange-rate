import type { AcctListItem } from "../api/acctList";

// utils/accountFilter.ts
export const filterAccounts = (
  list: AcctListItem[],
  searchTerm: string
): AcctListItem[] => {
  if (searchTerm.length === 0) return list;

  const term = searchTerm.toLowerCase();
  return list.filter((account) =>
    account.acctName.toLowerCase().includes(term)
  );
};
