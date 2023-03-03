'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const Postcategory = queryInterface.createTable("posts_categories", {
    post_id: {
      type: Sequelize.INTEGER,
        references: {
          model: 'blog_posts',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true,
    },
    category_id: {
      type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true,
    },


   })
   return Postcategory
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('post_categories')
  }
};
