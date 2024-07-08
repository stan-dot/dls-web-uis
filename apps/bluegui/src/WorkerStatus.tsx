import React from 'react';
import { Typography, Grid } from '@mui/material';

interface WorkerStatusProps {
    status: string;
}

const WorkerStatus: React.FC<WorkerStatusProps> = ({ status }) => {
    return (
        <Grid container alignItems="center">
            <Grid item>
                <div className={`status-light ${status.toLowerCase()}`}></div>
            </Grid>
            <Grid item>
                <Typography>{status}</Typography>
            </Grid>
        </Grid>
    );
};

export default WorkerStatus;
