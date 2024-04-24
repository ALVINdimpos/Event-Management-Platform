// models/user.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        as: 'bookings',
      });
      User.hasMany(models.Event, {
        foreignKey: 'userId',
        as: 'events',
      });
      User.hasMany(models.Ticket, {
        foreignKey: 'userId',
        as: 'tickets',
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
