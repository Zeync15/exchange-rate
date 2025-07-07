import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { debounceSearch } from "../utils";

type SearchBarProps = {
  searchTerm: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ searchTerm, onChange }: SearchBarProps) => {
  const [value, setValue] = useState("");

  // Create debounced function once
  const debouncedSearch = useMemo(() => debounceSearch(onChange), [onChange]);

  useEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
  };

  return (
    <div className="flex justify-between w-[300px] rounded-2xl border border-gray-300 p-2">
      <input
        type="text"
        placeholder="Search"
        className="border-none outline-0 w-full"
        value={value}
        onChange={handleInputChange}
      />

      <div onClick={handleClear} className="cursor-pointer">
        x
      </div>
    </div>
  );
};

export default SearchBar;
