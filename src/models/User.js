module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          displayName: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          email: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          password: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          image: {
            allowNull: true,
            defaultValue: 'url',
            type: DataTypes.STRING,
          },
    },
    {timestamps: false,
      underscored: true,
     tableName: 'users'    
    }
    );
/*     User.associate = (models) => {
        User.hasMany(models.blog_posts, { foreignKey: 'id', as: 'user_id'})

    }; */
    return User
}