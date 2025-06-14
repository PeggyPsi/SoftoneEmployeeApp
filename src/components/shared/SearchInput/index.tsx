import { useEffect, useState } from 'react';
import './style.module.scss'

type SearchInputProps = {
    label: string; // Label for the search input
    inputId: string; // Unique identifier for the input element
    value: string; // Initial value for the search input
    onSearchInputCallback: (value: string) => void; // Callback function to handle search input changes
};

function SearchInput({ label, inputId, value, onSearchInputCallback }: SearchInputProps) {
    const [searchValue, setSearchValue] = useState(value);

    useEffect(() => {
        // We keep the search value in sync with the value provided in props
        // This is useful when the parent component updates the value
        setSearchValue(value);
    }, [value]);

    return (
        <div className="search-input-container">
            <label htmlFor={inputId} className="mb-2">{label}</label>
            <input id={inputId}
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onBlur={() => onSearchInputCallback(searchValue)}
            />
        </div>
    );
}

export default SearchInput;