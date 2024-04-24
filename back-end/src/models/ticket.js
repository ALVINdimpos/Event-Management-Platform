const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.Booking, {
        foreignKey: 'bookingId',
        as: 'booking',
        onDelete: 'CASCADE',
      });
      Ticket.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event',
        onDelete: 'CASCADE',
      });
    }
  }

  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ticketCode: { type: DataTypes.STRING, allowNull: false, unique: true },
      isValid: { type: DataTypes.BOOLEAN, defaultValue: true },
      bookingId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Bookings',
          key: 'id',
          onDelete: 'CASCADE',
          },
       },
    },
    {
      sequelize,
      modelName: 'Ticket',
    }
  );

  return Ticket;
};
