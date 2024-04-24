const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('express-async-errors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const AuthRoutes = require('./routes/Auth.routes');
const RoleRoutes = require('./routes/Role.routes');
const UserRoutes = require('./routes/User.routes');
const logger = require('./utils/logger/index');
const eventRoutes = require('./routes/event.routes');
const bookingRoutes = require('./routes/booking.routes');
const ticketRoutes = require('./routes/ticket.routes');
const cookieParser = require('cookie-parser');
const app = express();

// use cors and body parse
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Note-Taking  application.' });
});
// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/roles', RoleRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tickets', ticketRoutes);

// 404 route
app.all('*', (req, res) => {
  res.status(4040).json({
    message: 'This route is not found',
  });
});

app.use(function (error, req, res, next) {
  logger.error(error.message);
  res.status(500).json({
    ok: false,
    message: error.message,
  });
});

// db connection instance
const dbCon = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected successfully');
  } catch (error) {
    console.log(`db: ${error.message}`);
  }
};

// port and host
const port = process.env.PORT || 3000;

// server and db
app.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
  dbCon();
});
