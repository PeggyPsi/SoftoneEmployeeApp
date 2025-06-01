import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Backdrop, CircularProgress, Button, Avatar } from '@mui/material';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'app/appStore';
import { fetchEmployeesThunk, setLimit, setPage } from '../../features/employees/employeesSlice';
import { useAppDispatch } from '../../app/appHooks';
import { stringAvatar } from '../../app/appUtils';
import './style.module.scss'

function EmployeeListPage() {
    const employeesState = useSelector((state: RootState) => state.employees);
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchEmployeesThunk(employeesState.fetchParams));
    }, [dispatch, employeesState.fetchParams]); // useEffect depends on the fetchParams

    //#region Render

    if (employeesState.loading) {
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
                            <TableCell>Email</TableCell>
                            {/* <TableCell>Status</TableCell> */}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeesState.data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>
                                    <div className='d-flex align-items-center'>
                                        {row.image ? <Avatar alt={`${row.firstName} ${row.lastName}`} src={row.image} /> : <Avatar {...stringAvatar(`${row.firstName} ${row.lastName}`)} />}
                                        <span className='ml-2'>{row.firstName} {row.lastName}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{row.company?.department}</TableCell>
                                <TableCell>
                                    <a href={'mailto:' + row.email} target='_blank'>{row.email}</a>
                                </TableCell>
                                {/* <TableCell>The API I am using does not have any property that refers to status</TableCell> */}
                                <TableCell>
                                    <Button variant="contained" onClick={() => { window.location.href = '/employee/' + row.id }}>
                                        <EditIcon />Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={employeesState.total ?? 0}
                    rowsPerPage={employeesState.fetchParams.limit}
                    page={employeesState.fetchParams.page - 1} // MUI TablePagination uses 0-based index
                    onPageChange={(event, newPage) => dispatch(setPage(newPage + 1))} // MUI TablePagination uses 0-based index so when page changes we need to dispatch newPage + 1
                    onRowsPerPageChange={(event) => dispatch(setLimit(Number(event.target.value)))}
                />
            </TableContainer >
        </>
    );

    //#endregion Render
}

export default EmployeeListPage;