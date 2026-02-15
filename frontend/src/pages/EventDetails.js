import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { API_URL } from "../config";

const EventDetails = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    fetchEvent();
    if (user) {
      checkRegistration();
    }
  }, [id, user]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API_URL}/events/${id}`);
      setEvent(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching event:", error);
      setLoading(false);
    }
  };

  const checkRegistration = async () => {
    try {
      const response = await axios.get(`${API_URL}/registrations/my-events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const registered = response.data.some((reg) => reg.eventId._id === id);
      setIsRegistered(registered);
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setRegistering(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${API_URL}/registrations/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMessage("Registration successful!");
      setIsRegistered(true);
      fetchEvent();
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  const handleCancel = async () => {
    setRegistering(true);
    setMessage("");

    try {
      await axios.delete(`${API_URL}/registrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Registration cancelled successfully");
      setIsRegistered(false);
      fetchEvent();
    } catch (error) {
      setMessage(error.response?.data?.message || "Cancellation failed");
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return <div className="loading">Loading event details...</div>;
  }

  if (!event) {
    return (
      <div className="event-not-found">
        <h2>Event not found</h2>
        <Link to="/events">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="event-details-page">
      <div className="event-details-container">
        <Link to="/events" className="back-link">
          ← Back to Events
        </Link>

        <div className="event-details-card">
          <div className="event-header">
            <span className="event-category-badge">{event.category}</span>
            <h1 className="event-title">{event.name}</h1>
            <p className="event-organizer-text">
              Organized by {event.organizer}
            </p>
          </div>

          <div className="event-info-section">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <strong>Location</strong>
                <p>{event.location}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📅</span>
              <div>
                <strong>Date & Time</strong>
                <p>{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">💺</span>
              <div>
                <strong>Available Seats</strong>
                <p>
                  {event.availableSeats} out of {event.capacity}
                </p>
              </div>
            </div>
          </div>

          <div className="event-description-section">
            <h3>About This Event</h3>
            <p>{event.description}</p>
          </div>

          {message && (
            <div
              className={`message ${message.includes("success") ? "success-message" : "error-msg"}`}
            >
              {message}
            </div>
          )}

          <div className="event-actions">
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="register-btn"
              >
                Login to Register
              </button>
            ) : isRegistered ? (
              <button
                onClick={handleCancel}
                className="cancel-btn"
                disabled={registering}
              >
                {registering ? "Cancelling..." : "Cancel Registration"}
              </button>
            ) : event.availableSeats > 0 ? (
              <button
                onClick={handleRegister}
                className="register-btn"
                disabled={registering}
              >
                {registering ? "Registering..." : "Register for Event"}
              </button>
            ) : (
              <button className="sold-out-btn" disabled>
                Event Full
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
