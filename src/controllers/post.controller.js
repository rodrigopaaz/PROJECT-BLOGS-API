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

const update = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.data;
    const { title, content } = req.body;
    const dataService = await postService.update(id, title, content);
    if (dataService.type) {
 return res.status(400)
    .json({ message: 'Some required fields are missing' }); 
}
    
    if (userId !== dataService.userId) {
 return res.status(401)
    .json({ message: 'Unauthorized user' }); 
}
return res.status(200).json(dataService);   
};

const remove = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.data;  
    const removePost = await postService.remove(id, userId);
    if (removePost.type) return res.status(removePost.type).json({ message: removePost.message });
    return res.status(204).json({ message: 'removed' });
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove,
};