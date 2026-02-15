import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/registrations`);
      setRegistrations(response.data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="dashboard-page">
      <h1>My Registrations</h1>

      {loading ? (
        <p>Loading...</p>
      ) : registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <ul>
          {registrations.map((reg) => (
            <li key={reg._id}>{reg.eventName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;

    </div>
  );
};

export default Dashboard;
