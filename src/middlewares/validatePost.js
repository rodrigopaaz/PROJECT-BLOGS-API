const { categoryService } = require('../services');

const noName = { attributes: { exclude: ['name'] } };

const validateFields = (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    if (!title || !content || !categoryIds) {
return res.status(400)
    .json({ message: 'Some required fields are missing' }); 
}
next();
};

const validateId = async (req, res, next) => {
    try {
        const { categoryIds } = req.body;

        const id = await categoryService.findAll(noName);
        const registeredIds = id.map((e) => e.id);
            const error = categoryIds.map((e) => {
            if (!registeredIds.includes(e)) { throw new Error(); }
            return 'null';
        });
            if (error.type) return res.status(400).json('not');
        next();
    } catch (error) { 
        return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
};

module.exports = { validateId, validateFields };