// src/App.tsx
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import WorkerStatus from './WorkerStatus';
import TaskHistory from './TaskHistory';
import usePlans from './hooks/usePlans';
import useDevices from './hooks/useDevices';
import useWorkerStatus from './hooks/useWorkerStatus';
import useNotifications from './hooks/useNotifications';
import Tour from './Tour';
import { NotificationBell } from './NotificationBell';
import { Container, Grid, Button } from '@mui/material';

const App: React.FC = () => {
    const { plans, fetchPlans } = usePlans();
    const { devices, fetchDevices } = useDevices();
    const { status, fetchWorkerStatus } = useWorkerStatus();
    const { notifications, fetchNotifications } = useNotifications();
    const [runTour, setRunTour] = React.useState(false);

    return (
        <Container>
            <Header fetchPlans={fetchPlans} fetchDevices={fetchDevices} fetchWorkerStatus={fetchWorkerStatus} />
            <Grid container>
                <Sidebar plans={plans} devices={devices} />
                <MainContent plans={plans} />
            </Grid>
            <Footer />
            <NotificationBell notifications={notifications} />
            <WorkerStatus status={status} />
            <TaskHistory />
            <Button onClick={() => setRunTour(true)}>Start Tour</Button>
            <Tour run={runTour} />
        </Container>
    );
};

export default App;
