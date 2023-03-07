const { postService } = require('../services');

const create = async (req, res) => {
    const data = req.body;
    const { userId } = req.data;
    const dataService = await postService.create(data, userId);
    const { id, title, content, updated, published } = dataService;
    return res.status(201).json({
        id,
        title, 
        content, 
        userId, 
        updated,
        published,
    });
};

const findAll = async (req, res) => {
    const dataService = await postService
    .findAll();
    return res.status(200).json(dataService);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const dataService = await postService
    .findById(id);
    if (dataService.type) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(dataService);
};

module.exports = {
    create,
    findAll,
    findById,
};