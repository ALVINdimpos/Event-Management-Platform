const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Booking.controller');
const { authGuard } = require('../middlewares'); 

// Define routes for booking-related operations
router.post('/', authGuard, bookingController.createBooking); 
router.get('/:id', bookingController.getBookingById);
router.delete('/:id', bookingController.deleteBookingById);
router.put('/cancel', bookingController.cancelBooking);

module.exports = router;
