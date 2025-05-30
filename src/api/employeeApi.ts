/**
 * Functions for fetching employee data from a mock API.
 * **/

const API_URL = "https://dummyjson.com/users";

export async function fetchEmployees() {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error("Failed to fetch employees");
    }
    const data = await res.json();
    return data.users;
}

export async function fetchEmployeeById(id: number) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch employee with id ${id}`);
    }
    const data = await res.json();
    return data;
}