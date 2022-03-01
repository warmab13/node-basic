const { Socket } = require("socket.io");
const { verifyJWT } = require("../helpers");

const socketController = async( socket = new Socket )=>{
    
    //console.log('Client connected', socket.id)
    console.log(socket.handshake.headers['x-token']);
    const token = socket.handshake.headers['x-token'];
    const user = await verifyJWT(token);
    if( !user ){
        return socket.disconnect();
    }

    console.log('Logged in', user.name)
    
}

module.exports = {
    socketController
}