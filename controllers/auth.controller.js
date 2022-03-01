const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const User = require('../models/user');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSignIn = async( req, res = response )=>{
    const { id_token } = req.body;
    //console.log(id_token)
    try {
        const { name, email, img } = await googleVerify( id_token ) ;

        //Reference create
        let user = await User.findOne({ email });

        if(  !user ){
            //Create user 
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true,
                role: "USER_ROLE"
            };

            user = new User( data )
            await user.save();
        }

        //If User in Database 
        if(!user.status){
            return res.status(401).json({
                msg: 'Talk with admin, user blocked'
            })
        }

        //Create JSON Web Token
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: 'Invalid token verify',
            error
        })
    }
}

const renewToken = async (req, res = response )=>{

    const { user } = req;

    const token = await generateJWT( user.id )

    res.json({ user, token })

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}