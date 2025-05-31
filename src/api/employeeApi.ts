/**
 * Functions for fetching employee data from a mock API.
 * **/

import type { Employee, EmployeeResponse } from '../models/Employee';

const baseApiUrl = "https://dummyjson.com";

/**
 *  Fetches a paginated list of employees from the API.
 *  @param {number} [page] - The page number to fetch. Defaults to 1.
 * **/
export async function fetchEmployees(page?: number, rowsPerPage?: number): Promise<EmployeeResponse> {
    const limit = rowsPerPage ?? 10; // Default limit
    let skip = 0; // Default skip
    if (page) {
        skip = (page - 1) * limit; // Assuming each page has 10 items
    }
    else {
        page = 1; // Default to page 1 if not provided
    }

    const url = `${baseApiUrl}/users?limit=${limit}&skip=${skip}`;

    return fetch(url)
        // When got a response call a `json` method on it
        .then((response) => response.json())
        // and return the result data.
        .then((data) => data as EmployeeResponse);
}

export async function fetchEmployeeById(id: number): Promise<Employee> {
    const url = `${baseApiUrl}/users/${id}`;

    return fetch(url)
        // When got a response call a `json` method on it
        .then((response) => response.json())
        // and return the result data.
        .then((data) => data as Employee);
}