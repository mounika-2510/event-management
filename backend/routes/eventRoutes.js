const express = require('express');
const Event = require('../models/Event');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { search, category, location } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        const events = await Event.find(query).sort({ date: 1 });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, organizer, location, date, description, capacity, category } = req.body;

        const event = await Event.create({
            name,
            organizer,
            location,
            date,
            description,
            capacity,
            availableSeats: capacity,
            category
        });

        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await Event.findByIdAndDelete(req.params.id);

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
});

module.exports = router;
