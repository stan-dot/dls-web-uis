import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const TaskHistory: React.FC = () => {
  const tasks = [
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' },
    // Add more tasks here
  ];

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemText primary={task.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskHistory;
