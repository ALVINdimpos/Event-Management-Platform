/** @type {import('sequelize').Seeder} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const {
      SEED_ROLE_NAME_1,
      SEED_ROLE_NAME_2,
    } = process.env;
    const roles = [
      {
        roleName: SEED_ROLE_NAME_1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: SEED_ROLE_NAME_2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return await queryInterface.bulkInsert('Roles', roles);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Roles', null, {});
  },
};
