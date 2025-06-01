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
    filteredData: Employee[];
    total: number; // Total number of employees (not filtered)
    loading: boolean;
    filterData: EmployeesFilterData;
}

// This is the initial state of the employees slice.
const initialState: EmployeesState = {
    allData: [],
    filteredData: [],
    total: 0,
    loading: false,
    filterData: {
        filters: [],
        page: 1, // Start from the first page
        limit: 10, // Default limit for pagination
    } as EmployeesFilterData
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
        //#region Filters
        setFirstNameFilter(state, action: PayloadAction<string>) {
            const filterValue = action.payload;
            const updatedFilters = state.filterData.filters || [];
            if (filterValue) {
                updatedFilters.push({ key: 'firstName', value: filterValue });
            }
            state.filterData.filters = updatedFilters;
            state.filterData.page = 1; // Reset to first page when department filter changes

            employeesSlice.caseReducers.filterEmployees(state);
        },
        setlastNameFilter(state, action: PayloadAction<string>) {
            const filterValue = action.payload;
            const updatedFilters = state.filterData.filters || [];
            if (filterValue) {
                updatedFilters.push({ key: 'lastName', value: filterValue });
            }
            state.filterData.filters = updatedFilters;
            state.filterData.page = 1; // Reset to first page when department filter changes

            employeesSlice.caseReducers.filterEmployees(state);
        },
        setDepartmentFilter(state, action: PayloadAction<string>) {
            const filterValue = action.payload;
            const updatedFilters = state.filterData.filters || [];
            if (filterValue) {
                updatedFilters.push({ key: 'company.department', value: filterValue });
            }
            state.filterData.filters = updatedFilters;
            state.filterData.page = 1; // Reset to first page when department filter changes

            employeesSlice.caseReducers.filterEmployees(state);
        },
        setEmailFilter(state, action: PayloadAction<string>) {
            const filterValue = action.payload;
            const updatedFilters = state.filterData.filters || [];
            if (filterValue) {
                updatedFilters.push({ key: 'email', value: filterValue });
            }
            state.filterData.filters = updatedFilters;
            state.filterData.page = 1; // Reset to first page when email filter changes

            employeesSlice.caseReducers.filterEmployees(state);
        },
        // TODO: add any other type of filters if needed
        //#endregion Filters
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
            let filteredData = [] as Employee[];
            // Filter the allData based on the filters
            if (filters.length === 0) { // If no filters are applied, return all data
                filteredData = state.allData.slice();
            }
            else {
                filteredData = state.allData.filter((employee) => {
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
            state.filteredData = filteredData.slice((page - 1) * limit, page * limit);
            state.total = filteredData.length;
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
export const { setFirstNameFilter, setlastNameFilter, setDepartmentFilter, setEmailFilter, setPage, setLimit } = employeesSlice.actions;

// Export the reducer to be used in the store
export default employeesSlice.reducer;