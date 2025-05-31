import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Backdrop, CircularProgress } from '@mui/material';
import { fetchEmployees } from '../../api/employeeApi';
import type { EmployeeResponse } from 'models/Employee';
import { useEffect, useState } from 'react';

function EmployeeListPage() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0); // Page starts at 0 for MUI TablePagination
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [employees, setEmployees] = useState<EmployeeResponse | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchEmployees(page + 1, rowsPerPage)
            .then((result) => {
                setEmployees(result);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, rowsPerPage]); // useEffect depends on the provided array of state variables

    //#region Handlers

    function handleChangePage(event: React.MouseEvent | null, page: number) {
        setPage(page);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value);
        setRowsPerPage(value);
        setPage(0); // Reset to first page when rows per page changes
    }

    //#endregion Handlers

    //#region Render

    if (loading || !employees) {
        return (
            <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.firstName} {row.lastName}</TableCell>
                                <TableCell>{row.company?.department}</TableCell>
                                <TableCell>-</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={employees?.total ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </>
    );

    //#endregion Render
}

export default EmployeeListPage;