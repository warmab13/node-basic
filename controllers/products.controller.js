const { response } = require("express");
const { Product  }  = require('../models')

//get categories paginated - total - populate 

const getProducts = async (req, res = response )=>{
    const { limit = 5, page = 0 } = req.query;
    const query = { status: true };

    const [total, products ] = await Promise.all([
        Product.countDocuments(query), 
        Product.find(query)
        .skip( Number( page ) )
        .limit( Number( limit ) )
        .populate('user category', 'name')
    ]);

    res.json({total, products});

}

//Get product by id - populate
const getProduct = async (req, res = response )=>{
    const { id } = req.params;
    const product = await Product.findById(id).populate('user category', 'name');
    res.json(product);
}

const createProduct = async (req, res = response )=>{

    const { status, user, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.name });

    if(productDB){ 
        return res.status(400).json({
            msg: `This product ${ productDB.name } already exist`
        })
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    console.log(data)

    const product = new Product(data);

    await product.save();

    res.status(201).json(product)
}

//update category, get name  to update 
const updateProduct = async(req, res = response)=>{
    let { id } = req.params;
    console.log(id)
    const { status, user, ...data } = req.body;

    if( data.name ){
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json( product );
}

//Delete category change status to false, only admins
const productDelete = async (req, res)=>{
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate( id, { status: false }, { new: true } );
    res.json(product);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    productDelete
}