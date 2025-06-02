import { Button } from '@mui/material';
import './style.module.scss';
import GroupIcon from '@mui/icons-material/Group';

function HomePage() {
    return (
        <div className="card">
            <h1 className="mt-0">Welcome to ENTERSOFT / SOFTONE Employee App</h1>
            <p>Use the following button to navigate to the provided endpoints of the application.</p>

            <hr />

            <div className="mt-3 d-flex align-items-center gap-3">
                <Button variant="contained" onClick={() => { window.location.href = '/employees/' }}>
                    <GroupIcon fontSize="small" className='mr-2' /> Go to employees list
                </Button>
            </div>
        </div>
    );
}

export default HomePage;