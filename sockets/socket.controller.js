const { Socket } = require("socket.io");
const { verifyJWT } = require("../helpers");
const { ChatMessages } = require("../models");

const chatMessages = new ChatMessages();

const socketController = async( socket = new Socket, io )=>{
    
    //console.log('Client connected', socket.id)
    console.log(socket.handshake.headers['x-token']);
    const token = socket.handshake.headers['x-token'];
    const user = await verifyJWT(token);
    if( !user ){
        return socket.disconnect();
    }

    chatMessages.userConnected(user)
    io.emit('active-users', chatMessages.usersArr);

    //clean when someone is disconnected
    socket.on('disconnect', ()=>{
        chatMessages.userDisconnect( user.id );
        io.emit('active-users', chatMessages.usersArr);
    })

}

module.exports = {
    socketController
}