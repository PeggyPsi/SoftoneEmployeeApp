import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee, EmployeeResponse } from "models/Employee";
import { fetchEmployees, type EmployeesFetchParams } from "./employeeApi";

// Private interface for the state of employees. No need to be exported.
interface EmployeesState {
    data: Employee[];
    total: number;
    loading: boolean;
    fetchParams: EmployeesFetchParams;
}

// This is the initial state of the employees slice.
const initialState: EmployeesState = {
    data: [],
    total: 0,
    loading: false,
    fetchParams: {
        queryStr: '',
        filters: [],
        page: 1,
        limit: 10,
    } as EmployeesFetchParams,
};

// Async thunk for fetching employees
export const fetchEmployeesThunk = createAsyncThunk(
    'employees/fetch',
    async (fetchParams: EmployeesFetchParams) => {
        return await fetchEmployees(fetchParams);
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
            const updatedFilters = state.fetchParams.filters || [];
            if (filterValue) {
                updatedFilters.push({ key: 'firstName', value: filterValue });
            }
            state.fetchParams.filters = updatedFilters;
            state.fetchParams.page = 1; // Reset to first page when department filter changes
        },
        setlastNameFilter(state, action: PayloadAction<string>) {
            const filterValue = action.payload;
            const updatedFilters = state.fetchParams.filters || [];
            if (filterValue) {
                updatedFilters.push({ key: 'lastName', value: filterValue });
            }
            state.fetchParams.filters = updatedFilters;
            state.fetchParams.page = 1; // Reset to first page when department filter changes
        },
        setDepartmentFilter(state, action: PayloadAction<string>) {
            const filterValue = action.payload;
            const updatedFilters = state.fetchParams.filters || [];
            if (filterValue) {
                updatedFilters.push({ key: 'company.department', value: filterValue });
            }
            state.fetchParams.filters = updatedFilters;
            state.fetchParams.page = 1; // Reset to first page when department filter changes
        },
        setEmailFilter(state, action: PayloadAction<string>) {
            const filterValue = action.payload;
            const updatedFilters = state.fetchParams.filters || [];
            if (filterValue) {
                updatedFilters.push({ key: 'email', value: filterValue });
            }
            state.fetchParams.filters = updatedFilters;
            state.fetchParams.page = 1; // Reset to first page when email filter changes
        },
        // TODO: add any other type of filters if needed
        //#endregion Filters
        setPage(state, action: PayloadAction<number>) {
            state.fetchParams.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.fetchParams.limit = action.payload;
            state.fetchParams.page = 0; // Reset to first page when rows per page changes
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
                state.data = response.users || [];
                state.total = response.total || 0;
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