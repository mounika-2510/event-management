import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import { API_URL } from "../config";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const categories = [
    "Technology",
    "Music",
    "Sports",
    "Business",
    "Arts",
    "Entertainment",
    "Health",
  ];

  const locations = [
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Goa",
  ];

  useEffect(() => {
    fetchEvents();
  }, [searchTerm, category, location]);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      let url = `${API_URL}/events?`;

      if (searchTerm) url += `search=${searchTerm}&`;
      if (category) url += `category=${category}&`;
      if (location) url += `location=${location}&`;

      console.log("Fetching events with URL:", url);

      const response = await axios.get(url);

      // Safe fallback if backend returns undefined
      setEvents(response.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("");
    setLocation("");
  };

  return (
    <div className="events-page">
      <div className="events-container">
        <h1 className="page-title">Discover Events</h1>

        <div className="filters-section">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />

          <select
            value={category}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={location}
            onChange={handleLocationChange}
            className="filter-select"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {(searchTerm || category || location) && (
            <button onClick={clearFilters} className="clear-btn">
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading">Loading events...</div>
        ) : (
          <>
            <p className="results-count">{events.length} events found</p>

            {events.length === 0 ? (
              <div className="no-events">
                <p>No events found matching your criteria</p>
              </div>
            ) : (
              <div className="events-grid">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;

