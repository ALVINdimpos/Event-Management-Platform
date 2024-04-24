const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Booking.controller');
const { isLoggedIn } = require('../middlewares/isLoggedIn'); 

// Define routes for booking-related operations
router.post('/', isLoggedIn, bookingController.createBooking); 
router.get('/:id', bookingController.getBookingById);
router.delete('/:id', bookingController.deleteBookingById);
router.put('/:id/cancel', bookingController.cancelBooking);

module.exports = router;
