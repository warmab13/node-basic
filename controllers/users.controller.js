const {response, request} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');


const usersGet = async (req = request, res = response)=>{
    const { limit = 5, page = 0 } = req.query;
    const query = { status: true };
    /*const users = await User.find(query)
    .skip( Number( page ) )
    .limit( Number( limit ) );

    const total = await User.countDocuments(query);*/

    const [total, users] = await Promise.all([
        User.countDocuments(query), 
        User.find(query)
        .skip( Number( page ) )
        .limit( Number( limit ) )
    ])

    res.json({total, users});
}

const usersPost = async (req, res = response)=>{
    // const { google, ...resto} = req.body si por alguna razon tenemos muchos elementos se utiliza el spread operator y solo desestructuras el que necesitas. resto funciona como variable 
    const { name, email, password, role } = req.body //El destructuring funciona como una pequeña validacion
    const user = new User( { name, email, password, role } )

    //Encrypt password
    const salt = bcryptjs.genSaltSync(10); //Numero de ciclos que quieres hacer para la desencription
    user.password = bcryptjs.hashSync( password, salt )
    //Save on DB
    await user.save();
    res.json({
        msg:"post API - usuariosPost",
        user: user
    })
}

const usersPut = async(req, res = response)=>{
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    //TODO Validate vs DB

    if( password ){
        //Encrypt password
        const salt = bcryptjs.genSaltSync(10); //Numero de ciclos que quieres hacer para la desencription
        rest.password = bcryptjs.hashSync( password, salt )
    }

    const userUpdate = await User.findByIdAndUpdate( id, rest )

    res.status(400).json({
        "msg": "put API - controller",
        userUpdate
    })
}

const usersPatch = (req, res)=>{
    res.json({
        "msg": "patch API - controller"
    })
}

const usersDelete = async (req, res)=>{
    const { id } = req.params
    console.log("id", id)
    //Delete physic
    //const user = await User.findOneAndDelete( id );

    const user = await User.findOneAndUpdate( id, { status: false } );

    res.json({
        user
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}