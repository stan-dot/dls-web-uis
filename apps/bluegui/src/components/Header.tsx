import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import Logo from './Logo';

interface HeaderProps {
  fetchPlans: () => void;
  fetchDevices: () => void;
  fetchWorkerStatus: () => void;
}

const Header: React.FC<HeaderProps> = ({ fetchPlans, fetchDevices, fetchWorkerStatus }) => {
  const handleResetEnvironment = () => {
    // Reset environment logic
  };

  const handleStartTour = () => {
    // Start tour logic
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Athena</Typography>
        <Logo />
        <IconButton>
          <Notifications />
        </IconButton>
        <Button onClick={handleStartTour}>Start Tour</Button>
        <Button onClick={handleResetEnvironment}>Reset Environment</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
