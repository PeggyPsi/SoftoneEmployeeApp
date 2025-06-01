import { useParams } from 'react-router';

function EmployeeDetailPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            EmployeeDetail {id}
        </div>
    );
}

export default EmployeeDetailPage;