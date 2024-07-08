import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import NotificationBell from './NotificationBell';
import WorkerStatus from './WorkerStatus';
import TaskHistory from './TaskHistory';
import usePlans from '../hooks/usePlans';
import useDevices from '../hooks/useDevices';
import useWorkerStatus from '../hooks/useWorkerStatus';
import useNotifications from '../hooks/useNotifications';

const App: React.FC = () => {
    const { plans, fetchPlans } = usePlans();
    const { devices, fetchDevices } = useDevices();
    const { status, fetchWorkerStatus } = useWorkerStatus();
    const { notifications, fetchNotifications } = useNotifications();

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
        </Container>
    );
};

export default App;
