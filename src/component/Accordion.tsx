import { useState, type ReactNode } from "react";
import type { CompanyListItem } from "../api/acctList";

interface AccordionProps {
  CompanyList: CompanyListItem[];
  children: ReactNode;
}

const Accordion = ({ CompanyList, children }: AccordionProps) => {
  const [currIdx, setCurrIdx] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setCurrIdx(currIdx === index ? null : index);
  };

  const renderTable = (index: number | null) => {
    if (currIdx === index) {
      return children;
    }
  };

  return (
    // <div>
    CompanyList.map((comp, index) => {
      return (
        <div key={index}>
          <div
            onClick={() => handleClick(index)}
            className="bg-gray-200 rounded-2xl p-4 my-4 cursor-pointer"
          >
            <div className="flex justify-between items-center ">
              <div className="">{comp.companyName}</div>

              <div className="flex gap-2">
                <div className="">{comp.numberOfCompany} accounts</div>
                <div className="">{currIdx === index ? "▲" : "▼"}</div>
              </div>
            </div>
          </div>
          <div>{renderTable(index)}</div>
        </div>
      );
    })
    // </div>
  );
};

export default Accordion;
