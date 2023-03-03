'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const User = queryInterface.createTable("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    display_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    image: {
      allowNull: false,
      type: Sequelize.STRING,
    },


   })
   return User
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('users')
  }
};
