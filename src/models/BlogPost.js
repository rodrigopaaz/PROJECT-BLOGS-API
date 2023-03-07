module.exports = (sequelize, DataTypes) => {

    const BlogPost = sequelize.define('BlogPost',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          title: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          content: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          password: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          published: {
            allowNull: true,
            type: DataTypes.DATE,
          },
          updated: {
            allowNull: true,
            type: DataTypes.DATE,
          },
          userId: {
            foreignKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
          }
    },
    {timestamps: false,
      underscored: true,
     tableName: 'blog_post'    
    }
    );
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})

    }; 
    return BlogPost
}