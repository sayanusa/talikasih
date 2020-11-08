'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('Users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addColumn('Users', 'bank_name',Sequelize.STRING)
    // await queryInterface.addColumn('Users', 'bank_account',Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Users');
     */
    // await queryInterface.removeColumn('Users', 'bank_name')
    // await queryInterface.removeColumn('Users', 'bank_account')
  },
};
