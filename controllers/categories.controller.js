const { response } = require("express");
const { Category  }  = require('../models')

//get categories paginated - total - populate 

const getCategories = async (req, res = response )=>{
    const { limit = 5, page = 0 } = req.query;
    const query = { status: true };

    const [total, categories ] = await Promise.all([
        Category.countDocuments(query), 
        Category.find(query)
        .skip( Number( page ) )
        .limit( Number( limit ) )
        .populate('user', 'name')
    ]);

    res.json({total, categories});

}

//Get categoria by id - populate
const getCategory = async (req, res = response )=>{
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.json({category});
}

const createCategory = async (req, res = response )=>{

    const name = req.body.name.toUpperCase();

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    //Guardar DB
    await category.save();

    res.status(201).json(category)
}

//update category, get name  to update 
const updateCategory = async(req, res = response)=>{
    let { id } = req.params;
    console.log(id)
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json( category );
}

//Delete category change status to false, only admins
const categoryDelete = async (req, res)=>{
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate( id, { status: false }, { new: true } );
    res.json(category);
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    categoryDelete
}