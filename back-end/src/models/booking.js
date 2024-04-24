const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event',
        onDelete: 'CASCADE',
      });
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
      Booking.hasMany(models.Ticket, {
        foreignKey: 'bookingId',
        as: 'tickets',
      });
    }
  }

  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      eventId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Events',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      isCancelled: { type: DataTypes.BOOLEAN, defaultValue: false },
      numTickets: DataTypes.INTEGER,
      bookingDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );

  return Booking;
};
