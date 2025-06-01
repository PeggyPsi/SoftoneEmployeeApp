import { fetchEmployeeById } from '../../features/employees/employeeApi';
import type { Employee } from '../../models/Employee';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from '@mui/material';

function EmployeeDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        if (id) {
            // Fetch employee details using the id from the URL
            fetchEmployeeById(id).then((result: Employee) => {
                setEmployee(result);
            });
        }
    });

    return (
        <>
            <div className='d-flex justify-content-end w-100 mb-4'>
                <Button variant="outlined" onClick={() => { window.location.href = '/employees/' }}>
                    <ArrowBackIosNewIcon fontSize="small" className='mr-2' /> Back to Employees List
                </Button>
            </div>
            <div className="card">
                <h1 className='mb-3 mt-0'>{employee?.firstName} {employee?.lastName}</h1>
                TODO
            </div>
        </>
    );
}

export default EmployeeDetailPage;