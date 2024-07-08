import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { PlayArrow, Pause, Stop } from '@mui/icons-material';
import { CountButton } from './components/CountButton';

interface MainContentProps {
    plans: any[];
}

const MainContent: React.FC<MainContentProps> = ({ plans }) => {
    return (
        <Grid item xs={10}>
            <Typography variant="h6">Plans</Typography>
            <Button startIcon={<PlayArrow />}>Run Plan</Button>
            <Button startIcon={<Pause />}>Pause Plan</Button>
            <Button startIcon={<Stop />}>Stop Plan</Button>
            {/* Display list of plans */}
            <CountButton />
        </Grid>
    );
};

export default MainContent;
