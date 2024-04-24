const { Booking, Event, User } = require('../models');
const logger = require('../utils/logger');
const { validateFields } = require('../utils/validation');
const { preparePagination, getTotalPages } = require('../utils/pagination');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const UserId = req.userId; // user id from logged-in user
    const { eventId, numTickets } = req.body;

    // Validate required fields
    const fieldsToBeValidated = ['eventId', 'numTickets'];
    const missingFields = validateFields(req, fieldsToBeValidated);

    if (missingFields.length > 0) {
      logger.error(
        `Adding User: Required fields are missing: ${missingFields.join(', ')}`
      );
      return res.status(400).json({
        ok: false,
        message: `Required fields are missing: ${missingFields.join(', ')}`,
      });
    }

    // Check if the event exists
    const event = await Event.findByPk(eventId);

    if (!event) {
      logger.error(`Creating Booking: Event with ID ${eventId} not found`);
      return res.status(404).json({ ok: false, message: 'Event not found' });
    }

    if (event.ticketsAvailable < numTickets) {
      logger.error(
        `Creating Booking: Insufficient tickets available for Event ${eventId}`
      );
      return res
        .status(400)
        .json({ ok: false, message: 'Insufficient tickets available' });
    }

    // Update ticketsAvailable for the event
    event.ticketsAvailable -= numTickets;
    await event.save();

    const booking = await Booking.create({
      eventId,
      userId: UserId,
      numTickets,
      bookingDate: new Date(),
    });

    res.status(201).json({
      ok: true,
      message: 'Booking created successfully',
      data: booking,
    });

    logger.info('Creating Booking: Booking created successfully');
  } catch (error) {
    logger.error(`Creating Booking: ${error}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};

// Get a booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingId = parseInt(id);
    const booking = await Booking.findByPk(bookingId, {
      include: [
        {
          model: Event,
          as: 'event',
        },
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (!booking) {
      logger.error(`Retrieving Booking: Booking with ID ${id} not found`);
      return res.status(404).json({ ok: false, message: 'Booking not found' });
    }
    res.status(200).json({
      ok: true,
      message: 'Booking retrieved successfully',
      data: booking,
    });
  } catch (error) {
    logger.error(`Retrieving Booking: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingId = parseInt(id);
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      logger.error(`Deleting Booking: Booking with ID ${id} not found`);
      return res.status(404).json({ ok: false, message: 'Booking not found' });
    }
    await booking.destroy();
    res.status(200).json({ ok: true, message: 'Booking deleted successfully' });
  } catch (error) {
    logger.error(`Deleting Booking: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};

// Cancel a booking by ID
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.query;
    const bookingId = parseInt(id);
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      logger.error(`Cancelling Booking: Booking with ID ${id} not found`);
      return res.status(404).json({ ok: false, message: 'Booking not found' });
    }
    booking.isCancelled = true;
    await booking.save();
    res
      .status(200)
      .json({ ok: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    logger.error(`Cancelling Booking: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};

// Get all bookings with pagination
const getAllBookings = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { offset, count } = preparePagination(page, limit);

    const bookings = await Booking.findAndCountAll({
      offset,
      limit: count,
      include: [
        {
          model: Event,
          as: 'event',
        },
        {
          model: User,
          as: 'user',
        },
      ],
    });

    const totalPages = getTotalPages(bookings.count, count);

    res.status(200).json({
      ok: true,
      message: 'Bookings retrieved successfully',
      data: {
        bookings: bookings.rows,
        totalBookings: bookings.count,
        totalPages,
      },
    });
  } catch (error) {
    logger.error(`Getting Bookings: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  deleteBookingById,
  cancelBooking,
  getAllBookings,
};
