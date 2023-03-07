/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

module.exports = (sequelize, DataTypes) => {

    const PostCategory = sequelize.define('PostCategory',
    {
        postId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'BlogPost',
                key: 'id'
            }
          },
          categoryId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Category',
                key: 'id'
            }
          },
    },
    {timestamps: false,
      underscored: true,
     tableName: 'posts_categories'    
    }
    );
    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            as: 'blog_post', through: PostCategory,
            foreignKey: 'categoryId', otherKey: 'postId',
        });
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories', through: PostCategory,
            foreignKey: 'postId', otherKey: 'categoryId',
        });
    }
    return PostCategory
}