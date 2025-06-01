/**
 * Utility functions for the application.
 * **/

export function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: '#DB5A42',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export function getDistinctValuesFromArray<T>(array: (T | undefined)[]): T[] {
    const seen = new Set();
    return array.filter((item): item is T => {
        if (item === undefined) {
            return false; // Exclude undefined values
        }
        if (seen.has(item)) {
            return false;
        }
        seen.add(item);
        return true;
    });
}