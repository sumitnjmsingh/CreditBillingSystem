import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({
  search,
  setSearch,
  placeholder = "Search...",
  filter,
  setFilter,
  filterOptions = [],
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Box */}

        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            value={search}
            placeholder={placeholder}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              border
              border-gray-300
              rounded-lg
              py-3
              pl-12
              pr-12
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Filter */}

        {filterOptions.length > 0 && (
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="
              border
              border-gray-300
              rounded-lg
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
