import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Backdrop, CircularProgress } from '@mui/material';
import { fetchEmployees } from '../../api/employeeApi';
import type { EmployeeResponse } from 'models/Employee';
import { useEffect, useState } from 'react';

function EmployeeListPage() {
    const [page, setPage] = useState(1);
    const [employees, setEmployees] = useState<EmployeeResponse | null>(null);

    useEffect(() => {
        fetchEmployees(page).then((result) => {
            setEmployees(result);
        });
    }, [page]); // useEffect depends on the provided array of state variables

    //#region Handlers

    function handlePageChange(value: number) {
        setPage(value);
    }

    //#endregion Handlers

    //#region Render

    if (!employees) {
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
                <Pagination count={Math.ceil(employees.total / 10)} page={page} onChange={(event: React.ChangeEvent<unknown>, value: number) => handlePageChange(value)} />
            </TableContainer>
        </>
    );

    //#endregion Render
}

export default EmployeeListPage;