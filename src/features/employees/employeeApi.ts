/**
 * Functions for fetching employee allData from a mock API.
 * **/

import type { Employee, EmployeeResponse } from '../../models/Employee';

const baseApiUrl = "https://dummyjson.com";

/**
 *  Fetches a paginated list of employees from the API.
 *  @returns {Promise<EEmployeeResponse>} - A promise that resolves to an EmployeeResponse object containing the list of employees and total count.
 * **/
export async function fetchAllEmployees(): Promise<EmployeeResponse> {
    const url = `${baseApiUrl}/users?limit=0&skip=0`;

    return fetch(url)
        // When got a response call a `json` method on it
        .then((response) => response.json())
        // and return the result allData.
        .then((allData) => allData as EmployeeResponse);
}

/**
 * Fetches a single employee by ID from the API.
 * @param {number} id - The ID of the employee to fetch.
 * @returns {Promise<Employee>} - A promise that resolves to an Employee object.
 */
export async function fetchEmployeeById(id: string): Promise<Employee> {
    const url = `${baseApiUrl}/users/${id}`;

    return fetch(url)
        // When got a response call a `json` method on it
        .then((response) => response.json())
        // and return the result allData.
        .then((allData) => allData as Employee);
}