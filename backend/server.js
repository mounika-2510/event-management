const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Event Management API is running' });
});

app.get('/api', (req, res) => {
    res.json({ message: 'API endpoint working' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));

const startServer = async () => {
    try {
        await connectDB();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

startServer();

module.exports = app;
