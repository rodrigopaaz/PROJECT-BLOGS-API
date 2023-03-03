'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const Category = queryInterface.createTable("categories", {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },


   })
   return Category
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('categories')
  }
};
