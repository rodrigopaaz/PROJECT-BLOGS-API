module.exports = (sequelize, DataTypes) => {

    const BlogPost = sequelize.define('BlogPost',
    {
        id: {
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          title: {
            type: DataTypes.STRING,
          },
          content: {
            type: DataTypes.STRING,
          },
          published: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          userId: {
            foreignKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
          }
    },
    {timestamps: false,
      underscored: true,
     tableName: 'blog_posts'    
    }
    );
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})

    }; 
    return BlogPost
}