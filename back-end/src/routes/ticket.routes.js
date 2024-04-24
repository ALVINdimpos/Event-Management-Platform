const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/Ticket.controller');

// Define routes for ticket-related operations
router.post('/', ticketController.createTicket);
router.get('/:id', ticketController.getTicketById);
router.delete('/:id', ticketController.deleteTicketById);

module.exports = router;
