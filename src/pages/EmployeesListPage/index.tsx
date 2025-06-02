import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Backdrop, CircularProgress, Button, Avatar } from '@mui/material';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'app/appStore';
import { fetchEmployeesThunk, setFilter, setLimit, setPage, type EmployeesFilterMeta } from '../../features/employees/employeesSlice';
import { useAppDispatch } from '../../app/appHooks';
import { getDistinctValuesFromArray, stringAvatar } from '../../utils/appUtils';
import './style.module.scss'
import SearchInput from '../../components/shared/SearchInput';
import { convertArrayOfStringsToArrayOfDropdownListItems } from '../../components/shared/DropdownList/utils';
import DropdownList from '../../components/shared/DropdownList';

function EmployeeListPage() {
    const employeesState = useSelector((state: RootState) => state.employees);
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchEmployeesThunk());
    }, [dispatch]);

    //#region Render

    if (employeesState.loading) {
        return (
            <>
                <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <h1 className='mb-3 mt-0'>Employees List</h1>
                <EmployeeListFilters />
            </>
        );
    }
    else {
        return (
            <>
                <h1 className='mb-3 mt-0'>Employees List</h1>
                <EmployeeListFilters />
                <div className='card'>
                    <TableContainer component={Paper} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Email</TableCell>
                                    {/* <TableCell>Status</TableCell> */}
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employeesState.filteredEmployees.map((row) => (
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
                                            <Button variant="outlined" onClick={() => { window.location.href = '/employee/' + row.id }}>
                                                <EditIcon fontSize='small' className='mr-2' />Edit
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
                            rowsPerPage={employeesState.filterData.limit}
                            page={employeesState.filterData.page - 1} // MUI TablePagination uses 0-based index
                            onPageChange={(event, newPage) => dispatch(setPage(newPage + 1))} // MUI TablePagination uses 0-based index so when page changes we need to dispatch newPage + 1
                            onRowsPerPageChange={(event) => dispatch(setLimit(Number(event.target.value)))}
                        />
                    </TableContainer >
                </div>
            </>
        );
    }

    //#endregion Render
}

function EmployeeListFilters() {
    const employeesState = useSelector((state: RootState) => state.employees);
    const dispatch: AppDispatch = useAppDispatch();

    const firstName = employeesState.filterData.filters?.find(filter => filter.key === 'firstName')?.value ?? '';
    const lastName = employeesState.filterData.filters?.find(filter => filter.key === 'lastName')?.value ?? '';
    const email = employeesState.filterData.filters?.find(filter => filter.key === 'email')?.value ?? '';
    const department = employeesState.filterData.filters?.find(filter => filter.key === 'company.department')?.value ?? '';

    // Convert departments to dropdown list items
    const departments = employeesState.allData.map(employee => employee.company?.department)
    const distinctDepartments = getDistinctValuesFromArray(departments);
    const departmentsDropdownListItems = convertArrayOfStringsToArrayOfDropdownListItems(distinctDepartments);

    return (
        <div className='card mb-3'>
            <div className="card-container d-flex align-items-center gap-3">
                <SearchInput value={firstName} inputId='firstNameInput' label="First Name" onSearchInputCallback={(value) => dispatch(setFilter({ key: "firstName", value: value } as EmployeesFilterMeta))} />
                <SearchInput value={lastName} inputId='lastNameInput' label="Last Name" onSearchInputCallback={(value) => dispatch(setFilter({ key: "lastName", value: value } as EmployeesFilterMeta))} />
                <SearchInput value={email} inputId='emailInput' label="Email" onSearchInputCallback={(value) => dispatch(setFilter({ key: "email", value: value } as EmployeesFilterMeta))} />
                <DropdownList value={department} inputId='departmentInput' label='Department'
                    items={departmentsDropdownListItems}
                    onDropdownListItemSelectedCallback={(value) => dispatch(setFilter({ key: "company.department", value: value } as EmployeesFilterMeta))} />
            </div>
        </div>
    )
}

export default EmployeeListPage;