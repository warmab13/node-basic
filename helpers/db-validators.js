const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') =>{
    const existRole = await Role.findOne({ role });
    if( !existRole ){
            throw new Error(`This role ${role} is not registered on DB`)
    }
}

const existsEmail = async ( email = '' )=>{
    const existEmail = await User.findOne({ email });
    if( existEmail ){
        throw new Error(`This Email ${email} is already registered`)
    }
}

const existUserById = async ( id ) =>{
    const existUser = await User.findById( id );
    if( !existUser ){
            throw new Error(`This id ${id} does not exist on DB`)
    }
}

module.exports = {
    isValidRole,
    existsEmail,
    existUserById
}