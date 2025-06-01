import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee, EmployeeResponse } from "models/Employee";
import { fetchAllEmployees } from "./employeeApi";

export interface EmployeesFilterMeta {
    key: string;
    value: string;
}

export interface EmployeesFilterData {
    filters?: EmployeesFilterMeta[];
    page: number; //
    limit: number;
}

// Private interface for the state of employees. No need to be exported.
interface EmployeesState {
    allData: Employee[];
    filteredEmployees: Employee[];
    total: number; // Total number of employees (not filtered)
    loading: boolean;
    filterData: EmployeesFilterData;
}

// This is the initial state of the employees slice.
const initialState: EmployeesState = {
    allData: [],
    filteredEmployees: [],
    total: 0,
    loading: false,
    filterData: {
        filters: [],
        page: 1, // Start from the first page
        limit: 10, // Default limit for pagination
    } as EmployeesFilterData,
};

// Async thunk for fetching employees
export const fetchEmployeesThunk = createAsyncThunk(
    'employees/fetch',
    async () => {
        return await fetchAllEmployees();
    }
);

// Create a slice for employees with initial state and reducers
const employeesSlice = createSlice({
    name: "employees",
    initialState: initialState,
    reducers: {
        setFilter(state, action: PayloadAction<EmployeesFilterMeta>,) {
            const newFilter = action.payload;
            const updatedFilters = state.filterData.filters || [];
            console.log('Setting filter:', newFilter.value);
            if (newFilter) {
                if (newFilter.value && newFilter.value.trim() !== '') { // filter value is not empty, then add or update the filter
                    if (updatedFilters.some(f => f.key === newFilter.key)) {
                        updatedFilters.find(f => f.key === newFilter.key)!.value = newFilter.value;
                    }
                    else {
                        updatedFilters.push({ key: newFilter.key, value: newFilter.value });
                    }
                }
                else { // filter value is empty, then remove the filter
                    const index = updatedFilters.findIndex(f => f.key === newFilter.key);
                    if (index !== -1) {
                        updatedFilters.splice(index, 1);
                    }
                }
            }
            state.filterData.filters = updatedFilters;
            state.filterData.page = 1; // Reset to first page when email filter changes

            employeesSlice.caseReducers.filterEmployees(state);
        },
        setPage(state, action: PayloadAction<number>) {
            state.filterData.page = action.payload;
            employeesSlice.caseReducers.filterEmployees(state);
        },
        setLimit(state, action: PayloadAction<number>) {
            state.filterData.limit = action.payload;
            state.filterData.page = 1; // Reset to first page when rows per page changes
            employeesSlice.caseReducers.filterEmployees(state);
        },
        filterEmployees(state) {
            const filters = state.filterData.filters || [];
            const page = state.filterData.page || 1;
            const limit = state.filterData.limit || 10;
            let filteredEmployees = [] as Employee[];
            // Filter the allData based on the filters
            if (filters.length === 0) { // If no filters are applied, return all data
                filteredEmployees = state.allData.slice();
            }
            else {
                filteredEmployees = state.allData.filter((employee) => {
                    return filters.every((filter) => {
                        switch (filter.key) {
                            case 'firstName':
                                return employee.firstName.toLowerCase().includes(filter.value.toLowerCase());
                            case 'lastName':
                                return employee.lastName.toLowerCase().includes(filter.value.toLowerCase());
                            case 'company.department':
                                return employee.company?.department?.toLowerCase().includes(filter.value.toLowerCase());
                            case 'email':
                                return employee.email?.toLowerCase().includes(filter.value.toLowerCase());
                            default:
                                return true; // If the filter key is not recognized, include the employee
                        }
                    });
                });
            }

            // Set the filtered data and total count
            state.filteredEmployees = filteredEmployees.slice((page - 1) * limit, page * limit);
            state.total = filteredEmployees.length;

            console.log('Filtered Data:', JSON.stringify(state.filterData));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployeesThunk.fulfilled, (state, action) => {
                state.loading = false;
                const response = action.payload as EmployeeResponse;
                state.allData = response.users || [];
                state.total = response.total || 0;
                employeesSlice.caseReducers.filterEmployees(state); // Apply filter after fetch
            })
            .addCase(fetchEmployeesThunk.rejected, (state) => {
                state.loading = false;
            });
    },
});

// Export the actions to be used in components
export const { setFilter, setPage, setLimit } = employeesSlice.actions;

// Export the reducer to be used in the store
export default employeesSlice.reducer;