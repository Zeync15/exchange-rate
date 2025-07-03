import { useState } from "react";
import type { CompanyListItem } from "../api/acctList";

interface CompanyDropdownProps {
  options: CompanyListItem[];
  onSelect: (selectedOption: string) => void;
}

const CompanyDropdown = ({ options, onSelect }: CompanyDropdownProps) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const allCompanies = [
    "All Companies",
    ...options.map((comp) => comp.companyName),
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedCompany(option);
    setIsOpen(false);
    onSelect(option);
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
              {comp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CompanyDropdown;
