import { useState } from "react";
import type { CompanyListItem } from "../api/acctList";

interface CompanyDropdownProps {
  options: CompanyListItem[];
  onSelect: (selectedOption: number) => void;
}

const CompanyDropdown = ({ options, onSelect }: CompanyDropdownProps) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const allCompanies: CompanyListItem[] = [
    { corpId: 0, companyName: "All Companies", numberOfCompany: 0 },
    ...options,
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: CompanyListItem) => {
    setSelectedCompany(option.companyName);
    setIsOpen(false);
    onSelect(option.corpId);
  };

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="flex justify-between bg-gray-200 rounded-2xl p-4 my-4 cursor-pointer"
      >
        <div>Company: {selectedCompany || "All Companies"} </div>
        <div className="">{isOpen ? "▲" : "▼"}</div>
      </div>

      {isOpen && (
        <ul className="absolute w-full border rounded-md shadow-lg bg-white  overflow-auto">
          {allCompanies.map((comp, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(comp)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {comp.companyName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CompanyDropdown;
