import { type ReactNode } from "react";
import type { CompanyListItem } from "../api/acctList";

interface AccordionProps {
  companyList: CompanyListItem[];
  corpId: number | null;
  onCorpIdChange: (corpId: number | null) => void;
  children: ReactNode;
}

const Accordion = ({
  companyList,
  corpId,
  onCorpIdChange,
  children,
}: AccordionProps) => {
  const handleSelect = (id: number) => {
    onCorpIdChange(corpId === id ? null : id);
  };

  const renderTable = (index: number | null) => {
    if (corpId === index) {
      return children;
    }
  };

  return companyList.map((comp) => {
    return (
      <div key={comp.corpId}>
        <div
          onClick={() => handleSelect(comp.corpId)}
          className="bg-gray-200 rounded-2xl p-4 my-4 cursor-pointer"
        >
          <div className="flex justify-between items-center ">
            <div className="">{comp.companyName}</div>

            <div className="flex gap-2">
              <div className="">{comp.numberOfCompany} accounts</div>
              <div className="">{corpId === comp.corpId ? "▲" : "▼"}</div>
            </div>
          </div>
        </div>
        <div>{renderTable(comp.corpId)}</div>
      </div>
    );
  });
};

export default Accordion;
