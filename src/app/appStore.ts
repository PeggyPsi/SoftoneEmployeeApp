import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees/employeesSlice";

// This is the main Redux store configuration for the application.
export const appStore = configureStore({
    reducer: {
        employees: employeesReducer
    }
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;