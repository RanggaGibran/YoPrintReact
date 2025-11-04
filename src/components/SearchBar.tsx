import { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (nextValue: string) => void;
  isLoading: boolean;
  totalItems: number | null;
}

const SearchBar = ({ value, onChange, isLoading, totalItems }: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-bar__input">
        <span className="search-bar__icon" aria-hidden>
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.5 14.5L18 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="9" cy="9" r="5.8" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <input
          value={value}
          onChange={handleChange}
          placeholder="Search for an anime title..."
          spellCheck={false}
          aria-label="Search for an anime title"
        />
        {isLoading ? <span className="search-bar__loader" aria-hidden /> : null}
      </div>
      <div className="search-bar__meta" role="status" aria-live="polite">
        {totalItems !== null ? `${totalItems} titles discovered` : "Find the perfect anime"}
      </div>
    </div>
  );
};

export default SearchBar;
