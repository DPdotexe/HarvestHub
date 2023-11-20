'use strict';

/** @type {import('sequelize-cli').Migration } */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'First1',
        last_name: 'Last1',
        email: 'email1@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'First2',
        last_name: 'Last2',
        email: 'email2@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
