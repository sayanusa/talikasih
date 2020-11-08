'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const seedStats = [
    {
      statsName: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  
  {
      statsName: "Open",
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  
  {
      statsName: "Finished",
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  
  {
      statsName: "Rejected",
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  
  {
      statsName: "Deleted",
      createdAt: new Date(),
      updatedAt: new Date(),
  }
   ];
   await queryInterface.bulkInsert('Stats', seedStats, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Stats', null, {});
  }
};
