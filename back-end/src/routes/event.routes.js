const express = require('express');
const router = express.Router();
const eventController = require('../controllers/Event.controller');
const { authGuard } = require('../middlewares'); 

// Define routes for event-related operations

router.post('', authGuard, eventController.createEvent);
router.put('/:eventId', authGuard, eventController.updateEvent);
router.get('', eventController.getAllEvents);
router.get('/users', authGuard, eventController.getEventsByUserId);
router.get('/nearby', eventController.getEventsNearMe);
router.get('/search', eventController.searchEvents);
router.get('/:eventId', eventController.getEventById);
router.get('/search/category', eventController.searchByCategory);
router.get('/search/title', eventController.searchByTitle);
router.delete('/:eventId', authGuard, eventController.deleteEvent);
router.get('/search/date', eventController.searchByDate);

module.exports = router;