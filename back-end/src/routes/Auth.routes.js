const express = require('express');

const {
  login,
  signup,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteAllUsers,
} = require('../controllers/Auth.controller');
const { authGuard } = require('../middlewares'); 
const router = express.Router();

// auth related routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/change-password', authGuard, changePassword);
router.delete('/delete-all', deleteAllUsers);

module.exports = router;
