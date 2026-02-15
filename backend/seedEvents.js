const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Event");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const events = [
  {
    name: "AI & Machine Learning Summit",
    organizer: "Tech Innovators",
    location: "Bangalore",
    date: new Date("2026-03-20"),
    description:
      "Join industry experts for discussions on latest AI trends and machine learning applications",
    capacity: 150,
    availableSeats: 150,
    category: "Technology",
  },
  {
    name: "Rock Music Festival",
    organizer: "Music Events Co",
    location: "Mumbai",
    date: new Date("2026-04-15"),
    description:
      "Annual rock music festival featuring top bands from across the country",
    capacity: 500,
    availableSeats: 500,
    category: "Music",
  },
  {
    name: "Startup Networking Event",
    organizer: "Startup Hub",
    location: "Delhi",
    date: new Date("2026-03-25"),
    description:
      "Network with entrepreneurs and investors in the startup ecosystem",
    capacity: 100,
    availableSeats: 100,
    category: "Business",
  },
  {
    name: "Cricket Tournament Finals",
    organizer: "Sports Association",
    location: "Hyderabad",
    date: new Date("2026-05-10"),
    description: "Watch the final match of the inter-city cricket tournament",
    capacity: 300,
    availableSeats: 300,
    category: "Sports",
  },
  {
    name: "Web Development Bootcamp",
    organizer: "Code Academy",
    location: "Pune",
    date: new Date("2026-03-18"),
    description:
      "Intensive 2-day bootcamp on modern web development technologies",
    capacity: 80,
    availableSeats: 80,
    category: "Technology",
  },
  {
    name: "Classical Dance Performance",
    organizer: "Cultural Society",
    location: "Chennai",
    date: new Date("2026-04-05"),
    description: "Experience traditional Indian classical dance forms",
    capacity: 200,
    availableSeats: 200,
    category: "Arts",
  },
  {
    name: "Digital Marketing Workshop",
    organizer: "Marketing Pro",
    location: "Bangalore",
    date: new Date("2026-03-22"),
    description: "Learn latest digital marketing strategies and tools",
    capacity: 60,
    availableSeats: 60,
    category: "Business",
  },
  {
    name: "Food & Music Carnival",
    organizer: "Event Masters",
    location: "Goa",
    date: new Date("2026-06-01"),
    description:
      "Enjoy delicious food from various cuisines with live music performances",
    capacity: 400,
    availableSeats: 400,
    category: "Music",
  },
  {
    name: "Blockchain Conference 2026",
    organizer: "Crypto Community",
    location: "Mumbai",
    date: new Date("2026-04-20"),
    description:
      "Explore the future of blockchain technology and cryptocurrency",
    capacity: 120,
    availableSeats: 120,
    category: "Technology",
  },
  {
    name: "Marathon Run",
    organizer: "Fitness Club",
    location: "Delhi",
    date: new Date("2026-05-15"),
    description: "Annual city marathon for fitness enthusiasts",
    capacity: 250,
    availableSeats: 250,
    category: "Sports",
  },
  {
    name: "Photography Exhibition",
    organizer: "Art Gallery",
    location: "Bangalore",
    date: new Date("2026-03-30"),
    description: "Exhibition showcasing works of renowned photographers",
    capacity: 100,
    availableSeats: 100,
    category: "Arts",
  },
  {
    name: "Business Leadership Summit",
    organizer: "Corporate Events",
    location: "Hyderabad",
    date: new Date("2026-04-25"),
    description: "Learn from successful business leaders and CEOs",
    capacity: 150,
    availableSeats: 150,
    category: "Business",
  },
  {
    name: "Jazz Night Live",
    organizer: "Jazz Club",
    location: "Pune",
    date: new Date("2026-04-10"),
    description: "An evening of smooth jazz with live performances",
    capacity: 80,
    availableSeats: 80,
    category: "Music",
  },
  {
    name: "Cloud Computing Workshop",
    organizer: "Tech Training",
    location: "Chennai",
    date: new Date("2026-03-28"),
    description: "Hands-on workshop on AWS and Azure cloud platforms",
    capacity: 70,
    availableSeats: 70,
    category: "Technology",
  },
  {
    name: "Badminton Championship",
    organizer: "Sports Federation",
    location: "Bangalore",
    date: new Date("2026-05-20"),
    description: "State level badminton championship",
    capacity: 200,
    availableSeats: 200,
    category: "Sports",
  },
  {
    name: "Stand-up Comedy Show",
    organizer: "Laugh Factory",
    location: "Mumbai",
    date: new Date("2026-04-08"),
    description: "Evening of laughter with top comedians",
    capacity: 150,
    availableSeats: 150,
    category: "Entertainment",
  },
  {
    name: "Yoga and Wellness Retreat",
    organizer: "Wellness Center",
    location: "Goa",
    date: new Date("2026-05-05"),
    description: "Weekend retreat focused on yoga and holistic wellness",
    capacity: 50,
    availableSeats: 50,
    category: "Health",
  },
  {
    name: "Mobile App Development Meetup",
    organizer: "Developer Community",
    location: "Delhi",
    date: new Date("2026-03-27"),
    description: "Monthly meetup for mobile app developers",
    capacity: 90,
    availableSeats: 90,
    category: "Technology",
  },
];

const seedEvents = async () => {
  try {
    await Event.deleteMany();
    console.log("Old events deleted");

    await Event.insertMany(events);
    console.log("Sample events added successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedEvents();
