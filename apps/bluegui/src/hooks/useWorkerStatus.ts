import { useState, useEffect } from 'react';
import axios from 'axios';

const useWorkerStatus = () => {
  const [status, setStatus] = useState<string>('idle');

  const fetchWorkerStatus = async () => {
    const response = await axios.get('/api/worker/status');
    setStatus(response.data.status);
  };

  useEffect(() => {
    const interval = setInterval(fetchWorkerStatus, 5000); // Polling every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return { status, fetchWorkerStatus };
};

export default useWorkerStatus;
