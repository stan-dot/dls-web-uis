import React from 'react';
import { IconButton, Badge } from '@mui/material';

import { Notifications } from '@mui/icons-material';
interface NotificationBellProps {
    notifications: string[];
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
    return (
        <IconButton className="notification-bell">
            <Badge badgeContent={notifications.length} color="secondary">
                <Notifications />
            </Badge>
        </IconButton>
    );
};