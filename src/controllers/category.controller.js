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

module.exports = {
    createCategory,
};