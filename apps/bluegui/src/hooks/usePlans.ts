import { useState, useEffect } from "react";
import axios from "axios";

const usePlans = () => {
  const [plans, setPlans] = useState<any[]>([]);

  const fetchPlans = async () => {
    const response = await axios.get("/api/plans");
    setPlans(response.data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return { plans, fetchPlans };
};

export default usePlans;
