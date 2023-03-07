const { BlogPost, PostCategory, sequelize } = require('../models');
/* const { schemas } = require('./validations'); */

/* const noPassword = { attributes: { exclude: ['password'] } };

const getByUserName = async (email) => {
   const data = await BlogPost.findOne({ where: { email } });
   return data;
};

const findAll = async () => {
   const data = await BlogPost.findAll(noPassword);
   return data;
};

const findById = async (id) => {
   const data = await BlogPost.findByPk(id, noPassword);
   return data;
}; */

const create = async (data, userId) => {
    const { title, content, categoryIds } = data;
    try {
        const result = await sequelize.transaction(async (t) => {
        const addUser = await BlogPost.create({ title, content, userId, categoryIds },
             { transaction: t });

        const postId = addUser.id;

        const categories = await categoryIds.map(async (categoryId) =>
        PostCategory.create({ categoryId, postId }, { transaction: t }));

            await Promise.all(categories);
             return addUser;
            });
        return result;
    } catch (error) {
        return { message: 'Houve um erro', error };
    }
};

module.exports = {
   create,
/*    getByUserName,
   findAll,
   findById, */
};