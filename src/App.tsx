import './App.module.scss'

/** Libs **/
import { Routes, Route, BrowserRouter } from "react-router";

/** Layout **/
// import Header from './layout/Header';
// import Footer from './layout/Footer';

/** Pages and Routing **/
import HomePage from './pages/HomePage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import EmployeeListPage from "./pages/EmployeesListPage";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './app/appMuiConfig';

function App() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? darkTheme : lightTheme;

    return (
        <>
            <ThemeProvider theme={theme}> {/* MUI Theme Provider */}
                <CssBaseline />
                <BrowserRouter>
                    <div className="p-4">
                        {/* <Header /> */}
                        <main>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/employees" element={<EmployeeListPage />} />
                                <Route path="/employee/:id" element={<EmployeeDetailPage />} />
                            </Routes>
                        </main>
                        {/* <Footer /> */}
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}

export default App
