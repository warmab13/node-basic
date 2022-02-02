
const Category = require('../models/category');

const existCategoryByName = async ( name = '' ) =>{
    let n = name.toUpperCase();
    const existCategory = await Category.findOne( {name: n} );
    if( existCategory ){
            throw new Error(`This category ${name} already exists`)
    }
}

module.exports = {
    existCategoryByName
}