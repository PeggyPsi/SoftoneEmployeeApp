export const getFromLocalStorage = <T>(key: string): T | null => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

export const setToLocalStorage = (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
};