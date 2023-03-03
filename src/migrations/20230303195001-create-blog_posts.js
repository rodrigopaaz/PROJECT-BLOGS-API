'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const Blog_post = queryInterface.createTable("blog_posts", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    content: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
    },
    published: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated: {
      allowNull: false,
      type: Sequelize.DATE,
    },


   })
   return Blog_post
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('blog_posts')
  }
};
