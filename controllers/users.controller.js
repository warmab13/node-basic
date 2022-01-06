const {response, request} = require('express')

const usersGet = (req, res = response)=>{
    res.json({
        "msg": "get API - controller"
    })
}

const usersPost = (req = request, res)=>{
    const { name, age} = req.body //El destructuring funciona como una pequeña validacion
    res.status(201).json({
        msg:"post API - usuariosPost",
        name: name,
        age: age
    })
}

const usersPut = (req, res = response)=>{
    res.status(400).json({
        "msg": "put API - controller"
    })
}

const usersPatch = (req, res)=>{
    res.json({
        "msg": "patch API - controller"
    })
}

const usersDelete = (req, res)=>{
    res.json({
        "msg": "delete API - controller"
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}