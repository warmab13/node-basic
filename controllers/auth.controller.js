const {response, request} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt')

const login = async ( req, res=response )=>{

    const { email, password } = req.body;

    try {

        //Verify if Email exist

        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                msg: 'User or Password are not correct - email'
            });
        }

        //If user is active
        if( !user.status ){
            return res.status(400).json({
                msg: 'User or Password are not correct - status:false'
            });
        }
        //Verify password

        const validPassword = bcryptjs.compareSync(password, user.password);
        if( !validPassword ){
            return res.status(400).json({
                msg: 'User or Password are not correct - password'
            });
        }

        //Generar JWT

        const token = await generateJWT( user.id );

        res.json({
            msg: 'Login ok',
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: `Talk with the administrator`
        })
    }
}


module.exports = {
    login
}