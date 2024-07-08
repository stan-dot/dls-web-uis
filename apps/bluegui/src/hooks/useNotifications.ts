import { useState, useEffect } from 'react';
import axios from 'axios';

const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    const response = await axios.get('/api/notifications');
    setNotifications(response.data);
  };

  useEffect(() => {
    const interval = setInterval(fetchNotifications, 5000); // Polling every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return { notifications, fetchNotifications };
};

export default useNotifications;
