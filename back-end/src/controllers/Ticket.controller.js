const { Ticket } = require('../models');
const logger = require('../utils/logger');

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    // Generate a random ticket code 
    const ticketCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    const isValid = true;
    const { bookingId } = req.body;
    const ticket = await Ticket.create({ ticketCode, isValid, bookingId });
    res
      .status(201)
      .json({ ok: true, message: 'Ticket created successfully', data: ticket });
    logger.info('Creating Ticket: Ticket created successfully');
  } catch (error) {
    logger.error(`Creating Ticket: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};
// Get a ticket by ID
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      logger.error(`Retrieving Ticket: Ticket with ID ${id} not found`);
      return res.status(404).json({ ok: false, message: 'Ticket not found' });
    }
    res
      .status(200)
      .json({
        ok: true,
        message: 'Ticket retrieved successfully',
        data: ticket,
      });
    logger.info('Retrieving Ticket: Ticket retrieved successfully');
  } catch (error) {
    logger.error(`Retrieving Ticket: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};
// Delete a ticket by ID
const deleteTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      logger.error(`Deleting Ticket: Ticket with ID ${id} not found`);
      return res.status(404).json({ ok: false, message: 'Ticket not found' });
    }
    await ticket.destroy();
      res.status(200).json({ ok: true, message: 'Ticket deleted successfully' });
    logger.info('Deleting Ticket: Ticket deleted successfully');
  } catch (error) {
    logger.error(`Deleting Ticket: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};
// Controller function to check the validity of a ticket
const checkTicketValidity = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      logger.error(`Checking Ticket Validity: Ticket with ID ${id} not found`);
      return res.status(404).json({ ok: false, message: 'Ticket not found' });
    }
    const isValid = ticket.isValid;
    res
      .status(200)
      .json({
        ok: true,
        message: 'Ticket validity checked successfully',
        data: { id, isValid },
      });
    logger.info('Checking Ticket Validity: Ticket validity checked successfully');
  } catch (error) {
    logger.error(`Checking Ticket Validity: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};

module.exports = {
  createTicket,
  getTicketById,
    deleteTicketById,
    checkTicketValidity,
};
