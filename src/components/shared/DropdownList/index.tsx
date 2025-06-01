// import { useState } from 'react';
import './style.module.scss'

export interface DropdownListItem {
    value: string; // The value of the dropdown item
    description: string; // The label to display for the dropdown item
}

type DropdownListProps = {
    label: string; // Label for the dropdown list
    inputId: string; // Unique identifier for the input element
    value: string; // Initial value for the dropdown list
    items: DropdownListItem[];
    clearable?: boolean; // Optional prop to indicate if the dropdown is clearable
    onDropdownListItemSelectedCallback: (value: string) => void; // Callback function to handle search input changes
}

function DropdownList({ label, inputId, value, items, clearable = true, onDropdownListItemSelectedCallback }: DropdownListProps) {
    return (
        <div className="dropdown-list-container">
            <label htmlFor={inputId}>{label}</label>
            <select name={inputId}
                id={inputId}
                onChange={(event) => onDropdownListItemSelectedCallback(event.target.value)}>
                {clearable && <option value="" selected={value === ''}>Select an option</option>}
                {items.map((item) => (
                    <option key={item.value} value={item.value} selected={item.value === value}>
                        {item.description}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropdownList;