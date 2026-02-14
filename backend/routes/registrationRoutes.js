const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:eventId", protect, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "Event is full" });
    }

    const alreadyRegistered = await Registration.findOne({ userId, eventId });

    if (alreadyRegistered) {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    const registration = await Registration.create({
      userId,
      eventId,
    });

    event.availableSeats -= 1;
    await event.save();

    res.status(201).json({
      message: "Registration successful",
      registration,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:eventId", protect, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    const registration = await Registration.findOne({ userId, eventId });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    await Registration.findByIdAndDelete(registration._id);

    const event = await Event.findById(eventId);
    if (event) {
      event.availableSeats += 1;
      await event.save();
    }

    res.json({ message: "Registration cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-events", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const registrations = await Registration.find({ userId })
      .populate("eventId")
      .sort({ registeredAt: -1 });

    res.json(registrations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
