const {response, request} = require('express')

const usersGet = (req = request, res = response)=>{
    const { q, name = "No name", apikey, page = 1, limit } = req.query;
    res.json({
        "msg": "get API - controller",
        q,
        name,
        apikey,
        page,
        limit
    })
}

const usersPost = (req, res = response)=>{
    const { name, age} = req.body //El destructuring funciona como una pequeña validacion
    res.status(201).json({
        msg:"post API - usuariosPost",
        name: name,
        age: age
    })
}

const usersPut = (req, res = response)=>{
    const {id} = req.params
    res.status(400).json({
        "msg": "put API - controller",
        id
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