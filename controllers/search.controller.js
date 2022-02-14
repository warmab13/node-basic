const { response } = require('express');
const { User, Category, Product } = require("../models");
const { ObjectId } = require('mongoose').Types;

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async( term = '', res = response)=>{

    const isMongoId = ObjectId.isValid(term) //TRUE

    if( isMongoId ){
        const user = await User.findById( term );
        return res.json({
            results: ( user ) ? [ user ] : []
        })
    }

    const regexp = new RegExp( term, 'i' );

    const [ users, total ] = await Promise.all([
        User.find({
            $or: [{ name: regexp }, { email: regexp }],
            $and: [ { status: true }]
        }),
        User.count({
            $or: [{ name: regexp }, { email: regexp }],
            $and: [ { status: true }]
        })
    ]);

    res.json({
        total,
        results: users
    })

}

const searchCategory = async( term = '', res = response)=>{

    const isMongoId = ObjectId.isValid(term) //TRUE

    if( isMongoId ){
        const category = await Category.findById( term );
        return res.json({
            results: ( category ) ? [ category ] : []
        })
    }

    const regexp = new RegExp( term, 'i' );

    const [ categories, total ] = await Promise.all([
        Category.find({ name: regexp, status: true }),
        Category.count({ name: regexp, status: true })
    ]);

    res.json({
        total,
        results: categories
    })

}

const searchProducts = async( term = '', res = response)=>{

    const isMongoId = ObjectId.isValid(term) //TRUE

    if( isMongoId ){
        const product = await Product.findById( term ).populate('category', 'name');
        return res.json({
            results: ( product ) ? [ product ] : []
        })
    }

    const regexp = new RegExp( term, 'i' );

    const [ products, total ] = await Promise.all([
        Product.find({ name: regexp, status: true }).populate('category', 'name'),
        Product.count({ name: regexp, status: true })
    ]);

    res.json({
        total,
        results: products
    })

}

const search = (req, res = response )=>{
    const { collection, term } = req.params

    if( !allowedCollections.includes( collection )){
        return res.status(400).json({
            msg: `Allowed collections are: ${allowedCollections}`
        })
    }

    switch( collection ){
        case 'users':
            searchUsers( term, res );
        break;
        case 'categories':
            searchCategory( term, res );
        break;
        case 'products':
            searchProducts( term, res );
        break;

        default:
            res.status(500).json({
                msg: `Error on search`
            })
    }
}


module.exports = {
    search
}