import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="event-card">
      <div className="event-category">{event.category}</div>
      <h3 className="event-name">{event.name}</h3>
      <p className="event-organizer">by {event.organizer}</p>
      <div className="event-details">
        <p className="event-location">📍 {event.location}</p>
        <p className="event-date">📅 {formatDate(event.date)}</p>
        <p className="event-seats">
          💺 {event.availableSeats} / {event.capacity} seats available
        </p>
      </div>
      <Link to={`/event/${event._id}`} className="view-details-btn">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
