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
        setSearch(state, action: PayloadAction<string>) {
            state.fetchParams.queryStr = action.payload;
            state.fetchParams.page = 1; // Reset to first page when search changes
        },
        setDepartmentFilter(state, action: PayloadAction<string>) {
            const departmentFilter = action.payload;
            const updatedFilters = state.fetchParams.filters || [];
            if (departmentFilter) {
                updatedFilters.push({ key: 'company.department', value: departmentFilter });
            }
            state.fetchParams.filters = updatedFilters;
            state.fetchParams.page = 1; // Reset to first page when department filter changes
        },
        setEmailFilter(state, action: PayloadAction<string>) {
            const emailFilter = action.payload;
            const updatedFilters = state.fetchParams.filters || [];
            if (emailFilter) {
                updatedFilters.push({ key: 'email', value: emailFilter });
            }
            state.fetchParams.filters = updatedFilters;
            state.fetchParams.page = 1; // Reset to first page when email filter changes
        },
        // TODO: add any other type of filters if needed
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
export const { setSearch, setDepartmentFilter, setPage, setLimit } = employeesSlice.actions;

// Export the reducer to be used in the store
export default employeesSlice.reducer;