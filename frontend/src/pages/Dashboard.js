import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { API_URL } from "../config";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(`${API_URL}/registrations/my-events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("My registrations:", response.data);
      setRegistrations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setLoading(false);
    }
  };

  const handleCancel = async (eventId) => {
    setCancelling(eventId);
    try {
      await axios.delete(`${API_URL}/registrations/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRegistrations();
    } catch (error) {
      console.error("Error cancelling registration:", error);
    } finally {
      setCancelling(null);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const isUpcoming = (date) => {
    return new Date(date) > new Date();
  };

  const upcomingEvents = registrations.filter(
    (reg) => reg.eventId && isUpcoming(reg.eventId.date),
  );
  const pastEvents = registrations.filter(
    (reg) => reg.eventId && !isUpcoming(reg.eventId.date),
  );

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <p>Welcome back, {user.name}!</p>
        </div>

        {registrations.length === 0 ? (
          <div className="empty-state">
            <h2>No Event Registrations Yet</h2>
            <p>You haven't registered for any events.</p>
            <button
              onClick={() => navigate("/events")}
              className="browse-events-btn"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <>
            <div className="events-section">
              <h2 className="section-title">
                Upcoming Events ({upcomingEvents.length})
              </h2>
              {upcomingEvents.length === 0 ? (
                <p className="no-events-text">No upcoming events</p>
              ) : (
                <div className="dashboard-events-list">
                  {upcomingEvents.map((registration) =>
                    registration.eventId ? (
                      <div
                        key={registration._id}
                        className="dashboard-event-card"
                      >
                        <div className="event-main-info">
                          <span className="category-tag">
                            {registration.eventId.category}
                          </span>
                          <h3
                            className="event-title-link"
                            onClick={() =>
                              navigate(`/event/${registration.eventId._id}`)
                            }
                          >
                            {registration.eventId.name}
                          </h3>
                          <p className="organizer-name">
                            by {registration.eventId.organizer}
                          </p>
                          <div className="event-meta">
                            <span>📍 {registration.eventId.location}</span>
                            <span>
                              📅 {formatDate(registration.eventId.date)}
                            </span>
                          </div>
                        </div>
                        <div className="event-actions-section">
                          <button
                            onClick={() =>
                              handleCancel(registration.eventId._id)
                            }
                            className="cancel-registration-btn"
                            disabled={cancelling === registration.eventId._id}
                          >
                            {cancelling === registration.eventId._id
                              ? "Cancelling..."
                              : "Cancel"}
                          </button>
                        </div>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            </div>

            <div className="events-section">
              <h2 className="section-title">
                Past Events ({pastEvents.length})
              </h2>
              {pastEvents.length === 0 ? (
                <p className="no-events-text">No past events</p>
              ) : (
                <div className="dashboard-events-list">
                  {pastEvents.map((registration) =>
                    registration.eventId ? (
                      <div
                        key={registration._id}
                        className="dashboard-event-card past-event"
                      >
                        <div className="event-main-info">
                          <span className="category-tag">
                            {registration.eventId.category}
                          </span>
                          <h3
                            className="event-title-link"
                            onClick={() =>
                              navigate(`/event/${registration.eventId._id}`)
                            }
                          >
                            {registration.eventId.name}
                          </h3>
                          <p className="organizer-name">
                            by {registration.eventId.organizer}
                          </p>
                          <div className="event-meta">
                            <span>📍 {registration.eventId.location}</span>
                            <span>
                              📅 {formatDate(registration.eventId.date)}
                            </span>
                          </div>
                        </div>
                        <div className="event-actions-section">
                          <span className="past-event-badge">Completed</span>
                        </div>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
