const {response} = require('express')

const usersGet = (req, res = response)=>{
    res.json({
        "msg": "get API - controller"
    })
}


module.exports = {
    usersGet
}