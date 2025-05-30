import { Routes, Route, BrowserRouter } from "react-router";
import HomePage from './pages/HomePage';
import Header from './layout/Header';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import EmployeeListPage from "pages/EmployeesListPage";
import './App.module.scss'

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="p-4">
                    <Header />
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
        </>
    )
}

export default App
