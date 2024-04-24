const { Event } = require('../models');
const logger = require('../utils/logger');
const { validateFields } = require('../utils/validation');
// create event
const createEvent = async (req, res) => {
    try { 
      const UserId = req.userId; // user id from logged in user
        const { title, description, location, ticketsAvailable } = req.body;
        // Validate required fields
        const fieldsToBeValidated = ['title', 'description', 'location', 'ticketsAvailable']
        const missingFields = validateFields(req, fieldsToBeValidated);
        if (missingFields.length > 0) {
        logger.error(
          `Creating Event: Required fields are missing: ${missingFields.join(', ')}`
        );
            return res.status(400).json({
                ok: false,
                message: `Required fields are missing: ${missingFields.join(', ')}`,
            });
        }
    const event = await Event.create({
      title,
      description,
     date: new Date(),
      location,
      ticketsAvailable,
      userId: UserId,
    });
    res
      .status(201)
        .json({ ok: true, message: 'Event created successfully', data: event });
    logger.info('Creating Event: Event created successfully');
  } catch (error) {
    logger.error(`Creating Event: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};
// get event by id
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      logger.error(`Retrieving Event: Event with ID ${id} not found`);
      return res.status(404).json({ ok: false, message: 'Event not found' });
    }
    res
      .status(200)
      .json({ ok: true, message: 'Event retrieved successfully', data: event });
  } catch (error) {
    logger.error(`Retrieving Event: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};
// delete event by id
const deleteEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      logger.error(`Deleting Event: Event with ID ${id} not found`);
      return res.status(404).json({ ok: false, message: 'Event not found' });
    }
    await event.destroy();
    res.status(200).json({ ok: true, message: 'Event deleted successfully' });
  } catch (error) {
    logger.error(`Deleting Event: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};
// update event by id

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location, ticketsAvailable } = req.body;
        const event = await Event.findByPk(id);
        if (!event) {
        logger.error(`Updating Event: Event with ID ${id} not found`);
        return res.status(404).json({ ok: false, message: 'Event not found' });
        }
        if (title) event.title = title;
        if (description) event.description = description;
        if (location) event.location = location;
        if (ticketsAvailable) event.ticketsAvailable = ticketsAvailable;
    
        await event.save();
        res
        .status(200)
        .json({ ok: true, message: 'Event updated successfully', data: event });
    } catch (error) {
        logger.error(`Updating Event: ${error.message}`);
        res.status(500).json({ ok: false, message: 'Internal server error' });
    }
};
// get all events

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res
        .status(200)
        .json({ ok: true, message: 'Events retrieved successfully', data: events });
    } catch (error) {
        logger.error(`Retrieving Events: ${error.message}`);
        res.status(500).json({ ok: false, message: 'Internal server error' });
    }
}

module.exports = {
  createEvent,
  getEventById,
    deleteEventById,
    updateEvent,
    getAllEvents
};
