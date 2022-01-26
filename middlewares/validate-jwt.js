const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const validateJWT = async(req = request, res = response, next)=>{
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'We didnt recieve token'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY);

        //Read user from uid
        const user = await User.findOne({_id: uid})
        console.log("User", user)
        req.user = user
        req.uid = uid;

        if( !user ){
            return res.status(401).json({
                msg: 'No valid Token - users does not exist'
            })
        }
        
        //Verify status on true
        if( !user.status ){
            return res.status(401).json({
                msg: 'No valid Token - usuario status false'
            })
        }

        next();  
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'No valid token'
        })
    }

}

module.exports = {
    validateJWT
}