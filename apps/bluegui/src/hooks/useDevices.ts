import { useState, useEffect } from "react";
import axios from "axios";

const useDevices = () => {
  const [devices, setDevices] = useState<any[]>([]);

  const fetchDevices = async () => {
    const response = await axios.get("/api/devices");
    setDevices(response.data);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return { devices, fetchDevices };
};

export default useDevices;
