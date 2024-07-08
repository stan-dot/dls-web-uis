// src/App.tsx
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import WorkerStatus from './components/WorkerStatus';
import TaskHistory from './components/TaskHistory';
import usePlans from './hooks/usePlans';
import useDevices from './hooks/useDevices';
import useWorkerStatus from './hooks/useWorkerStatus';
import useNotifications from './hooks/useNotifications';
import Tour from './components/Tour';
import { NotificationBell } from './components/NotificationBell';
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
