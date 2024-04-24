const bcrypt = require('bcrypt');
const logger = require('../utils/logger');
const { User, Role } = require('../models/');
require('dotenv').config();

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Fetch the first role from the Roles table
      const role = await Role.findOne();

      if (!role) {
        logger.error('No roles found in the database.');
        return;
      }

      const { SEED_FIRST_NAME, SEED_LAST_NAME, SEED_EMAIL, SEED_PASS } =
        process.env;

      const hashedPassword = await bcrypt.hash(SEED_PASS, 10);
      const newUser = {
        firstName: SEED_FIRST_NAME,
        lastName: SEED_LAST_NAME,
        email: SEED_EMAIL,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: role.id, // Use the fetched role ID
      };

      // Create user
      const insertedUser = await queryInterface.sequelize.transaction(
        async transaction => {
          const user = await User.create(newUser, { transaction });

          logger.info('User created successfully.');

          return user;
        }
      );

      if (!insertedUser) {
        logger.error('Inserted user is undefined.');
        return;
      }
    } catch (error) {
      logger.error(`Error seeding users: ${error.message}`);
    }
  },

  async down(queryInterface, Sequelize) {
    // Rollback logic if needed
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
