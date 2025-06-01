import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
    palette: {
        mode: 'light',
        background: {
            default: '#fff',
            paper: '#fff',
        },
    },
});

export const darkTheme = createTheme({
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
    palette: {
        mode: 'dark',
        background: {
            default: '#030712',
            paper: '#10141e',
        },
    },
});