const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const { PrismaClient } = require('@prisma/client')
const prisma =  new PrismaClient();

const validateJWT = async(req = request, res = response, next)=>{
    const token = req.header('x-token');
    //console.log("Token server", token)
    if( !token ){
        return res.status(401).json({
            msg: 'Authorization token is not present'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY);

        //Read user from uid
        const user = await prisma.users.findUnique({
            where: {
                id: uid
            },
        })

        req.user = {
            id: user.id,
            name:user.name,
            lastname: user.lastname,
            roles: user.roles,
            chat_tokens: user.chat_tokens
        }
        req.uid = user.id;

        //console.log("Server user", user)
        //console.log("Server uid", user.id)
        if( !user ){
            return res.status(401).json({
                msg: 'No valid Token - users does not exist'
            })
        }
        
        //Verify status on true
        if( !user.confirmed_at ){
            return res.status(401).json({
                msg: 'No valid Token - user is not confirmed'
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