import type { DropdownListItem } from ".";

export function convertArrayOfStringsToArrayOfDropdownListItems(array: string[]): DropdownListItem[] {
    return array.map((value) => convertStringToDropdownListItem(value));
}

function convertStringToDropdownListItem(value: string): DropdownListItem {
    return {
        value: value,
        description: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    };
}