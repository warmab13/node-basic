const { response } = require("express")

const isAdminRole = (req, res = response, next)=>{
    if( !req.user ){
        return res.status(500).json({
            msg: 'We need to verify first the token and later the role'
        })
    }

    const { role, name } = req.user;

    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${name} is not an Administrator, Unauthorize action`
        })
    }
    next();
}

const hasRole = ( ...roles ) => {
    return (req, res = response, next)=>{
        if( !req.user ){
            return res.status(500).json({
                msg: 'We need to verify first the token and later the role'
            })
        }

        if( !roles.includes(req.user.role) ){
            return res.status(401).json({
                msg: `The service require one of these roles ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    isAdminRole, 
    hasRole
}