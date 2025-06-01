/**
 * Functions for fetching employee data from a mock API.
 * **/

import type { Employee, EmployeeResponse } from '../../models/Employee';

const baseApiUrl = "https://dummyjson.com";

// For example to fetch employees from specific department the query will be
// 'https://dummyjson.com/users/filter?key=company.department&value=Engineering'
export interface EmployeesFilter {
    key: string;
    value: string;
}

export interface EmployeesFetchParams {
    queryStr?: string;
    filters?: EmployeesFilter[];
    page: number; //
    limit: number;
}

/**
 *  Fetches a paginated list of employees from the API.
 *  @param {EmployeesFetchParams} params - The parameters for fetching employees.
 *  @returns {Promise<EEmployeeResponse>} - A promise that resolves to an EmployeeResponse object containing the list of employees and total count.
 * **/
export async function fetchEmployees(params: EmployeesFetchParams): Promise<EmployeeResponse> {
    const urlSearchParams = buildUrlSearchParams(params);
    const queryString = urlSearchParams?.toString();
    const url = `${baseApiUrl}/users?${queryString}`;

    return fetch(url)
        // When got a response call a `json` method on it
        .then((response) => response.json())
        // and return the result data.
        .then((data) => data as EmployeeResponse);
}

function buildUrlSearchParams(params: EmployeesFetchParams): URLSearchParams {
    // Create a URLSearchParams object to build the query string
    const urlSearchParams = new URLSearchParams();

    if (params.queryStr) {
        urlSearchParams.set('q', params.queryStr);
    }

    if (params.filters && params.filters.length > 0) {
        params.filters.forEach((filter) => {
            urlSearchParams.append(filter.key, filter.value);
        });
    }

    urlSearchParams.append('limit', params.limit.toString());

    const skip = (params.page - 1) * params.limit; // Assuming each page has 10 items
    urlSearchParams.append('skip', skip.toString());

    return urlSearchParams;
}

/**
 * Fetches a single employee by ID from the API.
 * @param {number} id - The ID of the employee to fetch.
 * @returns {Promise<Employee>} - A promise that resolves to an Employee object.
 */
export async function fetchEmployeeById(id: number): Promise<Employee> {
    const url = `${baseApiUrl}/users/${id}`;

    return fetch(url)
        // When got a response call a `json` method on it
        .then((response) => response.json())
        // and return the result data.
        .then((data) => data as Employee);
}