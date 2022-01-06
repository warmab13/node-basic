const { Router } = require('express');
const { usersGet } = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGet)

router.put('/', (req, res)=>{
    res.status(400).json({
        "msg": "put API"
    })
})

router.post('/', (req, res)=>{
    res.status(201).json({
        "msg": "post API"
    })
})

router.delete('/', (req, res)=>{
    res.json({
        "msg": "delete API"
    })
})

router.patch('/', (req, res)=>{
    res.json({
        "msg": "patch API"
    })
})



module.exports = router;