const Role = require('../models/role');
const {User, Category, Product } = require('../models');

const isValidRole = async (role = '') =>{
    const existRole = await Role.findOne({ role });
    if( !existRole ){
            throw new Error(`This role ${role} is not registered on DB`)
    }
}

const existsEmail = async ( email = '' )=>{
    const existEmail = await User.findOne({ email });
    if( existEmail ){
        throw new Error(`This Email ${email} is already registered`)
    }
}

const existUserById = async ( id ) =>{
    const existUser = await User.findById( id );
    if( !existUser ){
            throw new Error(`This user id ${id} does not exist on DB`)
    }
}

/*Validador de categorias */
const existCategoryById = async ( id ) =>{
    const existCategory = await Category.findById( id );
    if( !existCategory ){
            throw new Error(`This category id ${id} does not exist on DB`)
    }
}

/* Validate allowed Collections */
const allowedCollections = async( collection = '', collections = [])=>{
     const include = collections.includes( collection );
     if( !include ){
        throw new Error(`This collection is no allowed - ${collections}`)
    }

    return true;
}

const existProductById = async ( id ) =>{
    const existProduct = await Product.findById( id );
    if( !existProduct ){
            throw new Error(`This product id ${id} does not exist on DB`)
    }
}

module.exports = {
    isValidRole,
    existsEmail,
    existUserById,
    existCategoryById,
    existProductById,
    allowedCollections
}