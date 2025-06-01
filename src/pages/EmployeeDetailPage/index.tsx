import { useParams } from 'react-router';

function EmployeeDetailPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <div className="card">
                EmployeeDetail {id}
            </div>
        </div>
    );
}

export default EmployeeDetailPage;