const { categoryService } = require('../services');

const createCategory = async (req, res) => {
    const data = req.body;
  
        const dataService = await categoryService.create(data);
        if (dataService.type) {
 return res.status(400).json({
            message: dataService.message,
        }); 
}
        const { id, name } = dataService;
        return res.status(201).json({ id, name });
};

const findAll = async (req, res) => {
    const dataService = await categoryService.findAll();
    res.status(200).json(dataService);
};

module.exports = {
    createCategory,
    findAll,
};