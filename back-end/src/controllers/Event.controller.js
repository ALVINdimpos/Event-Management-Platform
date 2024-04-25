const { Event } = require('../models');
const { Op } = require('sequelize');
const { preparePagination, getTotalPages } = require('../utils/pagination');
const { validateFields } = require('../utils/validation');
const logger = require('../utils/logger');

// Create event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      venue,
      locationPoint,
      startDate,
      endDate,
      imageUrl,
      ticketsAvailable,
    } = req.body;
    const missingFields = validateFields(req, [
      'title',
      'description',
      'category',
      'venue',
      'locationPoint',
      'startDate',
      'endDate',
      'imageUrl',
      'ticketsAvailable',
    ]);
    if (missingFields.length > 0) {
      logger.error(
        `Creating Event: Required fields are missing: ${missingFields.join(
          ', '
        )}`
      );
      return res.status(400).json({
        error: true,
        message: `Required fields are missing: ${missingFields.join(', ')}`,
      });
    }

    const event = await Event.create({
      title: title.toLowerCase(),
      description,
      category: category.toLowerCase(),
      venue,
      locationPoint,
      startDate,
      endDate,
      imageUrl,
      ticketsAvailable,
      userId: req.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    logger.info('Creating Event: Event created successfully');
    return res.status(201).json({
      error: false,
      message: 'Event successfully created',
      data: event,
    });
  } catch (error) {
    logger.error(`Creating Event: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};
// update event
const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const {
      title,
      description,
      category,
      venue,
      locationPoint,
      ticketsAvailable,
      startDate,
      endDate,
      imageUrl,
    } = req.body;
    const event = await Event.findByPk(eventId);
    if (!event) {
      logger.error(`Updating Event: Event with ID ${eventId} not found`);
      return res.status(404).json({
        error: true,
        message: 'Event not found',
      });
    }
    event.title = title.toLowerCase();
    event.description = description;
    event.category = category.toLowerCase();
    event.venue = venue;
    event.locationPoint = locationPoint;
    event.ticketsAvailable = ticketsAvailable;
    event.startDate = startDate;
    event.endDate = endDate;
    event.imageUrl = imageUrl;
    await event.save();
    logger.info(`Event with ID ${eventId} updated successfully`);
    return res.status(200).json({
      error: false,
      message: 'Event successfully updated',
      data: event,
    });
  } catch (error) {
    logger.error(`Updating Event: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const { page: offset, limit: count } = preparePagination(page, limit);

    // Fetch all events sorting by the date created which ensures that the latest one come up first
    const allEvents = await Event.findAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit: count,
    });

    // Get the total number of events in the DB
    const totalEvents = await Event.count();

    const totalPages = getTotalPages(totalEvents, count);

    return res.status(200).json({
      error: false,
      message: 'Events retrieved successfully',
      data: {
        allEvents,
        totalEvents,
        totalPages,
      },
    });
  } catch (error) {
    logger.error(`Retrieving Events: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch a single event by ID
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({
        error: true,
        message: 'Event not found.',
        data: event,
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Event retrieved successfully',
      data: event,
    });
  } catch (error) {
    logger.error(`Retrieving Event: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const getEventsByUserId = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const { page: offset, limit: count } = preparePagination(page, limit);

    // Fetch all user events sorting by the date created which ensures that the latest one come up first
    const userEvents = await Event.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']],
      offset,
      limit: count,
    });

    // Get the total number of user events in the DB
    const totalEvents = await Event.count({ where: { userId: req.userId } });

    const totalPages = getTotalPages(totalEvents, count);

    return res.status(200).json({
      error: false,
      message: 'User events retrieved successfully',
      data: {
        userEvents,
        totalEvents,
        totalPages,
      },
    });
  } catch (error) {
    logger.error(`Retrieving User Events: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const getEventsNearMe = async (req, res) => {
  try {
    const lon = Number(req.query.lon);
    const lat = Number(req.query.lat);
    const distanceInKm = Number(req.query.distanceInKm) || 10;

    const { page, limit } = req.query;

    const { page: offset, limit: count } = preparePagination(page, limit);

    // Fetch all events in KM radius from the location supplied
    const eventsNearMe = await Event.findAll({
      where: {
        locationPoint: {
          [Op.contains]: { type: 'Point', coordinates: [lon, lat] },
          [Op.near]: {
            type: 'Point',
            coordinates: [lon, lat],
            maxDistance: distanceInKm * 1000,
          },
        },
      },
      order: [['createdAt', 'DESC']],
      offset,
      limit: count,
    });

    // Get the total number of events near the location in the DB
    const totalEvents = await Event.count({
      where: {
        locationPoint: {
          [Op.contains]: { type: 'Point', coordinates: [lon, lat] },
          [Op.near]: {
            type: 'Point',
            coordinates: [lon, lat],
            maxDistance: distanceInKm * 1000,
          },
        },
      },
    });

    const totalPages = getTotalPages(totalEvents, count);

    return res.status(200).json({
      error: false,
      message: 'Events near location retrieved successfully',
      data: {
        eventsNearMe,
        totalEvents,
        totalPages,
      },
    });
  } catch (error) {
    logger.error(`Retrieving Events Near Me: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const searchEvents = async (req, res) => {
  try {
    const searchKey = Object.keys(req.query)[0];
    const searchValue = Object.values(req.query)[0];

    const { page, limit } = req.query;

    const { page: offset, limit: count } = preparePagination(page, limit);

    if (!searchKey) {
      return await getAllEvents(req, res);
    }

    // Determine the search criteria and search events accordingly
    let searchResult;
    if (searchKey && searchKey.toLowerCase() === 'category') {
      searchResult = await searchByCategory(
        searchValue.toLowerCase(),
        offset,
        count
      );
    }

    if (searchKey && searchKey.toLowerCase() === 'title') {
      searchResult = await searchByTitle(
        searchValue.toLowerCase(),
        offset,
        count
      );
    }

    return res.status(200).json({
      error: false,
      message: 'Events based on your search criteria',
      data: searchResult,
    });
  } catch (error) {
    logger.error(`Searching Events: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const searchByCategory = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { page: offset, limit: count } = preparePagination(page, limit);
    const { category } = req.query;

    const events = await Event.findAll({
      where: { category },
      order: [['createdAt', 'DESC']],
      offset,
      limit: count,
    });
    if (events.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'No events found for the specified category',
      });
    }
    const totalEvents = await Event.count({ where: { category } });
    const totalPages = getTotalPages(totalEvents, count);

    return res.status(200).json({
      error: false,
      message: 'Events retrieved successfully',
      data: {
        events,
        totalEvents,
        totalPages,
      },
    });
  } catch (error) {
    logger.error(`Searching Events by Category: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { page, limit, title } = req.query;
    const { page: offset, limit: count } = preparePagination(page, limit);

    const events = await Event.findAll({
      where: { title: { [Op.like]: `%${title}%` } },
      order: [['createdAt', 'DESC']],
      offset,
      limit: count,
    });

    if (events.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'No events found for the specified title',
      });
    }

    const totalEvents = await Event.count({
      where: { title: { [Op.iLike]: `%${title}%` } },
    });
    const totalPages = getTotalPages(totalEvents, count);

    return res.status(200).json({
      error: false,
      message: 'Events retrieved successfully',
      data: {
        events,
        totalEvents,
        totalPages,
      },
    });
  } catch (error) {
    logger.error(`Searching Events by Title: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};
// search by date
const searchByDate = async (req, res) => {
  try {
    const { page, limit, date } = req.query;
    const { page: offset, limit: count } = preparePagination(page, limit);

    const events = await Event.findAll({
      where: {
        [Op.or]: [
          {
            startDate: {
              [Op.gte]: date,
            },
          },
          {
            endDate: {
              [Op.lte]: date,
            },
          },
        ],
      },
      order: [['createdAt', 'DESC']],
      offset,
      limit: count,
    });

    if (events.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'No events found for the specified date',
      });
    }

    const totalEvents = await Event.count({
      where: {
        [Op.or]: [
          {
            startDate: {
              [Op.gte]: date,
            },
          },
          {
            endDate: {
              [Op.lte]: date,
            },
          },
        ],
      },
    });
    const totalPages = getTotalPages(totalEvents, count);

    return res.status(200).json({
      error: false,
      message: 'Events retrieved successfully',
      data: {
        events,
        totalEvents,
        totalPages,
      },
    });
  } catch (error) {
    logger.error(`Searching Events by Date: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};
// delete event
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    if (!event) {
      logger.error(`Deleting Event: Event with ID ${eventId} not found`);
      return res.status(404).json({
        error: true,
        message: 'Event not found',
      });
    }
    await event.destroy();
    logger.info(`Event with ID ${eventId} deleted successfully`);
    return res.status(200).json({
      error: false,
      message: 'Event successfully deleted',
    });
  } catch (error) {
    logger.error(`Deleting Event: ${error.message}`);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};
module.exports = {
  createEvent,
  getAllEvents,
  updateEvent,
  getEventById,
  getEventsByUserId,
  getEventsNearMe,
  searchEvents,
  searchByCategory,
  searchByTitle,
  deleteEvent,
  searchByDate,
};
