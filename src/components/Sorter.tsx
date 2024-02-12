import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sorter = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const navigate = useNavigate();

  const handleSortOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = event.target.value;
    setSelectedOption(sortOrder);
    navigate(`/?sortOrder=${sortOrder}`);
  };
  return (
    <div className="flex justify-around">
      <div className="relative w-60">
        <select
          onChange={handleSortOrderChange}
          value={selectedOption}
          className="py-3 px-4 pe-16  w-full border-teal-500 rounded-lg text-sm focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none"
        >
          <option value="email">Sort by Email</option>
          <option value="name" selected>
            Sort by Name
          </option>
        </select>
        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-8">
          <svg
            className="flex-shrink-0 h-4 w-4 text-teal-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Sorter;
