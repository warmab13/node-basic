const jwt = require('jsonwebtoken');
const { User } = require('../models')

const generateJWT = ( uid  = '') =>{
    return new Promise(( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRET_OR_PRIVATE_KEY, {
            expiresIn: '4h'
        }, (err, token)=>{
            if( err ){
                console.log(err);
                reject('The token does not created')
            }else{
                resolve( token );
            }
        })

    })
}

const verifyJWT = async( token = '' )=>{
    try {
        if( token.length < 10 ){
            return null;
        }

        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        const user = await User.findById( uid );

        if( user ){
            if( user.status ){
                return user;
            }else{
                return null;
            }
        }else{
            return null;
        }

    } catch (error) {
        return null;
    }
}

module.exports = {
    generateJWT,
    verifyJWT
}