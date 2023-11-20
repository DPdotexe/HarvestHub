'use strict';

/** @type {import('sequelize-cli').Migration } */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Orders', [
      {
        order_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Orders', null, {});
  },
};
