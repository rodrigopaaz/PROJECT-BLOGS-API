const { Op } = require('sequelize');
const { BlogPost, PostCategory, sequelize, User, Category } = require('../models');
/* const { schemas } = require('./validations'); */

/* const getByUserName = async (email) => {
   const data = await BlogPost.findOne({ where: { email } });
   return data;
}; */

const findAll = async () => {
   const data = await BlogPost.findAll(
    { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
   { model: Category, as: 'categories' }], 
},
   );
   return data;
};

const findById = async (id) => {
   const data = await BlogPost.findByPk(id, 
    
    { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
   { model: Category, as: 'categories' }], 
});
    if (!data) return { type: 'NOT_FOUND', message: 'Post does not exist' };
   return data;
};

const findByQuery = async (query) => {
    const data = await BlogPost.findAll(
        ({
            where: {
                [Op.or]: {
                content: {
                    [Op.like]: `%${query}%`,
                  },
              title: {
                [Op.like]: `%${query}%`,
              },
            },
            },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' }],
        }),
);
            
    return data;
};

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

const update = async (id, title, content) => {
    try {
            if (!title || !content) throw new Error();
            await BlogPost.update({ title, content }, {
            where: { id },
        });
        const updatedData = await findById(id);
        return updatedData;
    } catch (error) {
        return { type: 401, message: 'Not found', error };
    }
};

const remove = async (id, userId) => {
    try {
        const getUserData = await findById(id);
        if (getUserData.type) throw new Error();
        if (getUserData.userId !== userId) {  
            return { type: 401, message: 'Unauthorized user' };
          }
        await BlogPost.destroy({
            where: { id },
        });

    return { type: '', message: 'removed' };
    } catch (error) {
        return { type: 404, message: 'Post does not exist' };
    }
};

module.exports = {
   create,
   findAll,
   findById,
   update,
   remove,
   findByQuery,
};