const { response } = require('express');

const search = (req, res = response )=>{
    res.json({
        msg: 'Buscar...'
    })
}


module.exports = {
    search
}