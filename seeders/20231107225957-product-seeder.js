'use strict';

/** @type {import('sequelize-cli').Migration } */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Product1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Product2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
