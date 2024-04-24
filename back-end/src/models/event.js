// models/event.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(models.Booking, {
        foreignKey: 'eventId',
        as: 'bookings',
      });
      Event.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
      Event.belongsToMany(models.Ticket, {
        through: models.Booking,
        foreignKey: 'eventId',
        as: 'tickets',
      });
    }
  }

  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      date: DataTypes.DATE,
      location: DataTypes.STRING,
      ticketsAvailable: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
    },
    {
      sequelize,
      modelName: 'Event',
    }
  );

  return Event;
};
