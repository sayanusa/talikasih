'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //     await queryInterface.addColumn(
    //       "Campaigns",
    //       "shareCount",
    //       Sequelize.INTEGER
    //     );
    //     await queryInterface.addColumn(
    //       "Campaigns",
    //       "donationCount",
    //       Sequelize.INTEGER
    //     );
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.removeColumn("Campaigns", "bankAccount");
    // await queryInterface.removeColumn("Campaigns", "shareCount");
  },
};
