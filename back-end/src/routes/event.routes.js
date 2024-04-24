const express = require('express');
const router = express.Router();
const eventController = require('../controllers/Event.controller');
const { isLoggedIn } = require('../middlewares/isLoggedIn'); 

// Define routes for event-related operations
router.post('/',isLoggedIn, eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEventById);

module.exports = router;
