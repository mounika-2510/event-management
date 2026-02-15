const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

connectDB();


app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());

// Test Routes
app.get('/', (req, res) => {
    res.json({ message: 'Event Management API is running' });
});

app.get('/api', (req, res) => {
    res.json({ message: 'API endpoint working' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

