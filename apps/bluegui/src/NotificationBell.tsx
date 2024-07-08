import React from 'react';
import { IconButton, Badge } from '@mui/material';
import { Notifications } from '@mui/icons-material';

interface NotificationBellProps {
    notifications: any[];
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
    return (
        <IconButton>
            <Badge badgeContent={notifications.length} color="secondary">
                <Notifications />
            </Badge>
        </IconButton>
    );
};

export default NotificationBell;
